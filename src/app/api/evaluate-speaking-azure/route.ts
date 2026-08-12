import { NextRequest, NextResponse } from 'next/server';

/**
 * API Route: Evaluate Speaking using Azure Pronunciation Assessment
 * POST /api/evaluate-speaking-azure
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get('audio') as Blob;
    const referenceText = formData.get('referenceText') as string;

    if (!audioBlob || !referenceText) {
      return NextResponse.json({ error: 'Missing audio or referenceText' }, { status: 400 });
    }

    const AZURE_SPEECH_KEY = process.env.AZURE_SPEECH_KEY;
    const AZURE_SPEECH_REGION = process.env.AZURE_SPEECH_REGION || 'eastus';

    if (!AZURE_SPEECH_KEY) {
      console.warn('⚠️ AZURE_SPEECH_KEY not configured, using mock response');
      // Mock response for pilot demo
      return NextResponse.json({
        recognitionStatus: 'Success',
        accuracyScore: 85,
        fluencyScore: 78,
        pronunciationScore: 82,
        completenessScore: 100,
        overallScore: 82,
        words: [
          { word: referenceText, accuracyScore: 85, errorType: 'None' }
        ]
      });
    }

    // 2. Call Azure Speech REST API
    // Documentation: https://learn.microsoft.com/en-us/azure/ai-services/speech-service/rest-speech-to-text#pronunciation-assessment
    
    const pronunciationAssessmentParams = {
      ReferenceText: referenceText,
      GradingSystem: 'HundredMark',
      Granularity: 'Phoneme',
      Dimension: 'Comprehensive'
    };

    const pronunciationAssessmentParamsJson = JSON.stringify(pronunciationAssessmentParams);
    const pronunciationAssessmentParamsBase64 = Buffer.from(pronunciationAssessmentParamsJson).toString('base64');

    const response = await fetch(
      `https://${AZURE_SPEECH_REGION}.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=en-US`,
      {
        method: 'POST',
        headers: {
          'Ocp-Apim-Subscription-Key': AZURE_SPEECH_KEY,
          'Pronunciation-Assessment': pronunciationAssessmentParamsBase64,
          'Content-Type': 'audio/wav; codecs=audio/pcm; samplerate=16000',
          'Accept': 'application/json'
        },
        body: audioBlob
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Azure API Error:', errorText);
      throw new Error('Azure Pronunciation Assessment failed');
    }

    const result = await response.json();

    // Extract scores from Azure response format
    const assessmentResult = result.NBest?.[0]?.PronunciationAssessment;

    if (!assessmentResult) {
      throw new Error('No assessment results found in Azure response');
    }

    return NextResponse.json({
      recognitionStatus: result.RecognitionStatus,
      accuracyScore: assessmentResult.AccuracyScore,
      fluencyScore: assessmentResult.FluencyScore,
      pronunciationScore: assessmentResult.PronScore,
      completenessScore: assessmentResult.CompletenessScore,
      overallScore: assessmentResult.PronScore, // Azure PronScore is often used as overall
      words: result.NBest?.[0]?.Words || []
    });

  } catch (error: any) {
    console.error('Error in Azure evaluation API:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
