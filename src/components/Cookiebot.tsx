const COOKIEBOT_ID = process.env.NEXT_PUBLIC_COOKIEBOT_ID || '474b1dce-7229-40d3-88c2-a2323b9a57f9';

export default function Cookiebot() {
  return (
    <script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={COOKIEBOT_ID}
      data-blockingmode="auto"
      type="text/javascript"
      async
    />
  );
}
