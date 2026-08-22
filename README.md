# 🔒 Real-Time E2EE Chat App (END TO END ENCRYPTION)

A secure, real-time End-to-End Encrypted (E2EE) chat application featuring a WhatsApp-inspired UI, voice messaging, and image sharing. Built with Node.js, Socket.io, and the browser's native Web Crypto API.

---

## ✨ Features :

* 🔒 **End-to-End Encryption (E2EE):** All text, images, and voice notes are encrypted in the browser using **AES-GCM (256-bit)** before being transmitted over Socket.io. The server never sees raw data or secret keys.
* 🔑 **Client-Side Key Derivation:** Custom passphrase hashing using **PBKDF2** with SHA-256 and 100,000 iterations.
* 🎨 **WhatsApp-Inspired UI:** Modern green theme, responsive speech bubbles, sender tags, and background pattern.
* 📸 **Media & Voice Sharing:** Send photos and record voice notes with up to 50MB payload support.
* ⚡ **Instant Messaging:** Powered by WebSockets (Socket.io) with full **Enter key** keyboard support.

---

## 🛠️ Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript, Web Crypto API
* **Backend:** Node.js, Express.js
* **Real-Time Engine:** Socket.io
* **Deployment:** Render
---