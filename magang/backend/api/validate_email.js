// magang/backend/api/validate_email.js

export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const { email } = req.body;
  
        if (!email) {
          return res.status(400).json({ error: "Email is required." });
        }
  
        const allowedDomains = [
          "student.itk.ac.id",
          "lecturer.itk.ac.id",
          "staff.itk.ac.id",
        ];
  
        const emailParts = email.split("@");
        if (emailParts.length !== 2) {
          return res.status(400).json({ error: "Invalid email format." });
        }
  
        const emailDomain = emailParts[1].toLowerCase();
  
        if (!allowedDomains.includes(emailDomain)) {
          return res.status(400).json({ error: "Email domain is not allowed." });
        }
  
        return res.status(200).json({ message: "Email is valid." });
      } catch (error) {
        console.error("Error validating email:", error);
        return res.status(500).json({ error: "Internal Server Error." });
      }
    } else {
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  