# Forge — Text to Image (NVIDIA NIM)

Browsers can't call NVIDIA's API directly — it blocks cross-origin requests, which is the
"Load failed" you saw. This version routes through a tiny server function, which also keeps
your API key off the client.

## Deploy to Vercel

1. Put both files in a folder:
   ```
   forge/
   ├── index.html
   └── api/
       └── generate.js
   ```

2. Add your key as an environment variable (NOT in the code):
   - Vercel dashboard → your project → Settings → Environment Variables
   - Name: `NVIDIA_API_KEY`
   - Value: your fresh nvapi-... key
   - Or via CLI: `vercel env add NVIDIA_API_KEY`

3. Deploy:
   ```
   vercel --prod
   ```

That's it. Open the URL, type a prompt, Generate.

## Local testing

```
npm i -g vercel
vercel dev
```
Set NVIDIA_API_KEY in a `.env.local` file first:
```
NVIDIA_API_KEY=nvapi-xxxxx
```

## Notes

- Revoke the old key you pasted earlier — it's compromised.
- schnell uses cfg_scale 0 and ~4 steps; dev and SD 3.5 use higher cfg + more steps (set automatically).
- If a model returns a 404, check the exact path at build.nvidia.com — hosted model slugs occasionally change.
