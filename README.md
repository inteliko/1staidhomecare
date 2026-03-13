# VoiceFlow Starter Project

এই starter app-এ আছে:
- `index.html`: landing page
- `signup.html`: signup page
- `pricing.html`: pricing + Stripe checkout
- `app.html`: text ↔ voice converter
- `server.js`: Express backend (Signup, Checkout, optional OpenAI TTS/Transcription APIs)

## Quick Start

1. Install dependencies
```bash
npm install
```

2. Copy environment template
```bash
cp .env.example .env
```

3. Fill required Stripe keys:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_ALLOWED_PRICE_IDS` (your Stripe price IDs, comma-separated)
4. Optional: add `OPENAI_API_KEY` for better voice quality + transcription.

5. Run
```bash
npm run dev
```

6. Open:
```text
http://localhost:3000
```

## Notes

- `signup` এখানে demo হিসেবে শুধু `localStorage`-এ ইউজার ডাটা রাখে।
- Production এ signup/auth/payment metadata store করার জন্য database/Auth layer এবং webhook endpoint যোগ করুন।
- `OpenAI` না দিলে converter কেবল browser API দিয়ে কাজ করবে।
