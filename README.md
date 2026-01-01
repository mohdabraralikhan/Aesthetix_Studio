# Aesthetix Studio - Vanilla Architecture

A premium, high-performance blazing-fast Vanilla HTML/CSS/JS application powered by Supabase.

## ✨ Key Features

- **Blazing Fast**: Optimized for Core Web Vitals with zero framework overhead.
- **Modern Admin**: A secure, real-time dashboard for managing client inquiries.
- **Supabase Integration**: Serverless backend handling form submissions and authentication.
- **Premium UI**: Bespoke Design System with custom animated Toast notifications and Modal dialogs.
- **Cost Efficient**: Hosted 100% for free using modern static hosting and Supabase Free Tier.

## 🚀 Getting Started

### 1. Prerequisites
- A [Supabase](https://supabase.com) account.
- A local web server (e.g., `python -m http.server 8000`).

### 2. Supabase Setup

1. **Database Schema**: Execute the following in your Supabase SQL Editor:
```sql
CREATE TABLE inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  project_type TEXT NOT NULL,
  budget TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'NEW',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Security
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- 1. Public can only INSERT (submit the form)
CREATE POLICY "Allow public insert" ON inquiries FOR INSERT TO anon WITH CHECK (true);

-- 2. Authenticated Admin has full control
CREATE POLICY "Allow admin managed" ON inquiries 
  FOR ALL 
  USING (auth.role() = 'authenticated') 
  WITH CHECK (auth.role() = 'authenticated');
```

2. **Authentication**: 
   - Go to **Authentication > Users** in Supabase and click **Add User**.
   - Create the account you will use to log in to the dashboard.

3. **Keys**: Update `js/config.js` with your specific **Connect URL** and **Anon Key**.

## 🔒 Admin Portal

The dashboard is located at `/admin.html`.
- **Login**: Use the email and password you created in the Supabase Dashboard.
- **Persistence**: Sessions are managed securely via Supabase Auth.
- **Feedback**: Features bespoke interactive confirmations and real-time status updates.

## 📦 Deployment (GitHub Pages)

To deploy this site to GitHub Pages:
1. Push your code to a GitHub repository.
2. Go to **Settings > Pages**.
3. Select the `main` branch and `/root` folder.
4. **Important**: Since this is a Client-Side SPA, ensure all your internal links use relative paths (which they currently do).

## �️ Security FAQ

**Q: Is the API Key in `js/config.js` safe to commit?**
**A: Yes.** The `anonKey` is designed by Supabase to be public. It is secured by the **Row Level Security (RLS)** policy you ran above, which strictly prevents the public from reading or deleting your data.

**Q: Where are my passwords stored?**
**A: Not in the source code.** Passwords are never hardcoded. They are managed entirely by Supabase's secure authentication service.

## 📁 Project Structure

```text
├── admin.html       # Secure Admin Entry
├── index.html       # Public Site Entry
├── css/             # Design System & Utilities
├── js/
│   ├── app.js       # Main Router & Logic
│   ├── admin.js     # Auth & Dashboard logic
│   ├── config.js    # API Credentials
│   ├── components/  # Toast, Modal, Header, Icons
│   └── sections/    # Page sections (Home, Work, Contact, etc.)
├── images/          # Assets
└── fonts/           # Typography
```
