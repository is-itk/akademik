// magang/backend/api/hello.js

export default function handler(req, res) {
    return res.status(200).json({ message: "Hello from Vercel (ESM)!" });
  }
  