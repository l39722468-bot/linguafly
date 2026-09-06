# Technical Specification: Vercel AI Gateway Integration

## Context
Focus English utilizes OpenAI for exercise generation, speaking/writing evaluations, and an AI Tutor. Integrating Vercel AI Gateway will improve reliability through fallbacks and reduce costs via caching.

## Implementation Approach
1. **Environment Variables**: Use `VERCEL_AI_GATEWAY_URL` and `VERCEL_AI_GATEWAY_ID`.
2. **Client Update**: Migrate from direct `openai` library calls to the Vercel AI SDK or configure the OpenAI client to use the Gateway's base URL.
3. **Caching Strategy**: Enable caching for idempotent requests like exercise evaluation and static course generation.
4. **Fallback Strategy**: Configure fallbacks to Anthropic (Claude) or Groq (Llama) for high-availability routes.

## Modified Files
- `src/lib/ai/config.ts` (if it exists, otherwise identify central config)
- `src/app/api/evaluate-*/route.ts`
- `src/app/api/ai-tutor/*/route.ts`
- `src/hooks/use-realtime-ai.ts`

## Verification
- Run `npm run lint` and `npm run build` to ensure type safety.
- Test evaluation endpoints manually via Postman or scripts.
- Monitor Vercel AI Gateway dashboard for cache hits.
