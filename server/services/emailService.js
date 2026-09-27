export const sendBrevoEmail = async ({ toEmail, toName, subject, htmlContent }) => {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.includes('xxxxxxxx')) {
    console.log('ℹ️  Brevo API key missing. Email simulated locally.');
    return { success: true, simulated: true, message: 'Email simulated locally.' };
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: { name: 'Offline Orbit Platform', email: process.env.SENDER_EMAIL || 'noreply@offlineorbit.edu' },
        to: [{ email: toEmail, name: toName || 'Learner / Educator' }],
        subject,
        htmlContent
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.warn('Brevo API response error:', errText);
      return { success: false, error: errText };
    }

    const data = await response.json();
    console.log('✅ Email sent successfully via Brevo API:', data.messageId);
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('Brevo Email dispatch failed:', error.message);
    return { success: false, error: error.message };
  }
};

export const sendPasswordResetEmail = async ({ recipientEmail, userName, resetCode }) => {
  const subject = `🔐 Offline Orbit: Password Reset Verification Code`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #FAF9F6; padding: 24px; color: #1E2229;">
      <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border: 1px solid #E5E2DA; border-radius: 16px; padding: 32px; text-align: center;">
        <h1 style="color: #F95738; margin: 0 0 8px 0; font-size: 24px;">🪐 Offline Orbit</h1>
        <p style="color: #5A606C; font-size: 13px; margin: 0 0 24px 0;">Personalized & Offline Learning Platform</p>

        <h2 style="font-size: 18px; color: #1E2229; margin-bottom: 8px;">Password Reset Request</h2>
        <p style="font-size: 13px; color: #5A606C; line-height: 1.5;">
          Hello ${userName || 'Learner'}, you requested to reset your password. Use the 6-digit verification code below to set your new password:
        </p>

        <div style="background-color: #FFF0ED; border: 2px dashed #F95738; border-radius: 12px; padding: 16px; margin: 24px 0; display: inline-block;">
          <span style="font-size: 28px; font-weight: bold; letter-spacing: 6px; color: #F95738;">${resetCode}</span>
        </div>

        <p style="font-size: 12px; color: #89909E;">
          This verification code will expire in 15 minutes. If you did not request a password reset, please ignore this email.
        </p>
      </div>
    </div>
  `;

  return await sendBrevoEmail({
    toEmail: recipientEmail,
    toName: userName,
    subject,
    htmlContent
  });
};

export const sendStudentProgressReport = async ({ studentName, recipientEmail, summaryText, topicMastery }) => {
  const subject = `🪐 Offline Orbit: Learning Progress Report for ${studentName}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #FAF9F6; padding: 24px; color: #1E2229;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #E5E2DA; border-radius: 16px; padding: 32px;">
        <div style="text-align: center; border-b: 1px solid #E5E2DA; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #F95738; margin: 0; font-size: 24px;">🪐 Offline Orbit</h1>
          <p style="color: #5A606C; font-size: 13px; margin-top: 4px;">Personalized & Low-Bandwidth Learning Platform</p>
        </div>

        <h2 style="font-size: 18px; color: #1E2229;">Student Progress Report: <strong>${studentName}</strong></h2>
        
        <div style="background-color: #EEF2FF; border-left: 4px solid #4F46E5; padding: 16px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #4F46E5; margin: 0 0 8px 0; font-size: 14px;">Summary & Recommendations</h3>
          <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #1E2229;">${summaryText}</p>
        </div>

        <h3 style="font-size: 15px; color: #1E2229; margin-top: 24px;">Topic Mastery Snapshot</h3>
        <table style="width: 100%; border-collapse: collapse; margin-top: 8px; font-size: 13px;">
          <thead>
            <tr style="background-color: #F3F1EC; text-align: left;">
              <th style="padding: 10px; border-bottom: 1px solid #E5E2DA;">Topic</th>
              <th style="padding: 10px; border-bottom: 1px solid #E5E2DA;">Status</th>
              <th style="padding: 10px; border-bottom: 1px solid #E5E2DA;">Average Score</th>
            </tr>
          </thead>
          <tbody>
            ${(topicMastery || []).map(t => `
              <tr>
                <td style="padding: 10px; border-bottom: 1px solid #E5E2DA;">${t.topic}</td>
                <td style="padding: 10px; border-bottom: 1px solid #E5E2DA; font-weight: bold; color: ${t.status === 'mastered' ? '#0D9488' : t.status === 'practising' ? '#4F46E5' : '#D97706'}">${t.status?.toUpperCase()}</td>
                <td style="padding: 10px; border-bottom: 1px solid #E5E2DA;">${t.scoreAvg || 80}%</td>
              </tr>
            `).join('')}
          </tbody>
        </table>

        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E5E2DA; text-align: center; font-size: 11px; color: #89909E;">
          Sent automatically via Brevo Email Service • Offline Orbit Learning Platform
        </div>
      </div>
    </div>
  `;

  return await sendBrevoEmail({
    toEmail: recipientEmail,
    toName: studentName,
    subject,
    htmlContent
  });
};

export const sendLoginOtpEmail = async ({ recipientEmail, userName, otpCode }) => {
  console.log(`🔑 [LOGIN OTP DISPATCH] To: ${recipientEmail} | OTP Code: ${otpCode}`);
  const subject = `🚀 Offline Orbit: Your Login Verification OTP ${otpCode}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #FAF9F6; padding: 24px; color: #1E2229;">
      <div style="max-width: 520px; margin: 0 auto; background: #ffffff; border: 1px solid #E5E2DA; border-radius: 20px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <div style="text-align: center; border-bottom: 1px solid #E5E2DA; padding-bottom: 16px; margin-bottom: 24px;">
          <h1 style="color: #F95738; margin: 0; font-size: 26px; font-weight: 800;">🪐 Offline Orbit</h1>
          <p style="color: #5A606C; font-size: 13px; margin-top: 4px;">Low-Bandwidth & Offline STEM Learning System</p>
        </div>

        <h2 style="font-size: 20px; color: #1E2229; margin-bottom: 12px; text-align: center;">Login Verification OTP</h2>
        <p style="font-size: 14px; color: #5A606C; line-height: 1.6; text-align: center;">
          Welcome back, <strong>${userName || 'Learner'}</strong>! Enter the 6-digit OTP code below to sign in:
        </p>

        <div style="text-align: center; margin: 28px 0;">
          <div style="background-color: #FFF0ED; border: 2px dashed #F95738; border-radius: 16px; padding: 18px 28px; display: inline-block;">
            <span style="font-size: 32px; font-weight: 900; letter-spacing: 8px; color: #F95738;">${otpCode}</span>
          </div>
        </div>

        <p style="font-size: 12px; color: #89909E; text-align: center; line-height: 1.5;">
          This OTP code is valid for 10 minutes. If you did not request this login attempt, please secure your account immediately.
        </p>

        <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E5E2DA; text-align: center; font-size: 11px; color: #89909E;">
          Sent via Brevo SMTP • Sender: ${process.env.SENDER_EMAIL || 'mohamedsubhan155@gmail.com'}
        </div>
      </div>
    </div>
  `;

  return await sendBrevoEmail({
    toEmail: recipientEmail,
    toName: userName,
    subject,
    htmlContent
  });
};

export const sendLoginNotificationEmail = async ({ recipientEmail, userName, streakDays = 5, points = 480, badgesCount = 3 }) => {
  const subject = `🔥 Account Activity & Study Streak Update for ${userName}`;
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background-color: #FAF9F6; padding: 24px; color: #1E2229;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border: 1px solid #E5E2DA; border-radius: 20px; padding: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
        
        <div style="text-align: center; border-bottom: 1px solid #E5E2DA; padding-bottom: 20px; margin-bottom: 24px;">
          <h1 style="color: #F95738; margin: 0; font-size: 26px; font-weight: 800;">🪐 Offline Orbit</h1>
          <p style="color: #5A606C; font-size: 13px; margin-top: 4px;">Personalized & Low-Bandwidth Learning Platform</p>
        </div>

        <div style="background-color: #FFF0ED; border: 1px solid #F95738; border-radius: 16px; padding: 20px; margin-bottom: 24px; text-align: center;">
          <h2 style="color: #F95738; margin: 0 0 6px 0; font-size: 20px;">Welcome Back, ${userName}!</h2>
          <p style="color: #1E2229; font-size: 13px; margin: 0;">You have successfully signed in to your Offline Orbit account.</p>
        </div>

        <div style="margin-bottom: 24px;">
          <table style="width: 100%; border-collapse: separate; border-spacing: 8px;">
            <tr>
              <td style="width: 33%; padding: 14px; background: #FAF9F6; border: 1px solid #E5E2DA; border-radius: 12px; text-align: center;">
                <span style="font-size: 20px; font-weight: 800; color: #F95738;">🔥 ${streakDays} Days</span>
                <p style="font-size: 11px; color: #5A606C; font-weight: bold; margin: 4px 0 0 0;">Active Streak</p>
              </td>
              <td style="width: 33%; padding: 14px; background: #FAF9F6; border: 1px solid #E5E2DA; border-radius: 12px; text-align: center;">
                <span style="font-size: 20px; font-weight: 800; color: #0D9488;">🏆 ${points}</span>
                <p style="font-size: 11px; color: #5A606C; font-weight: bold; margin: 4px 0 0 0;">Orbit Points</p>
              </td>
              <td style="width: 33%; padding: 14px; background: #FAF9F6; border: 1px solid #E5E2DA; border-radius: 12px; text-align: center;">
                <span style="font-size: 20px; font-weight: 800; color: #4F46E5;">🎖️ ${badgesCount}</span>
                <p style="font-size: 11px; color: #5A606C; font-weight: bold; margin: 4px 0 0 0;">Earned Badges</p>
              </td>
            </tr>
          </table>
        </div>

        <div style="border: 1px solid #E5E2DA; border-radius: 16px; padding: 20px; margin-bottom: 24px;">
          <h3 style="color: #1E2229; font-size: 15px; margin: 0 0 12px 0;">🔔 Active Notifications & Recommended Actions</h3>
          <ul style="margin: 0; padding-left: 20px; font-size: 13px; color: #5A606C; line-height: 1.8;">
            <li><strong>Photosynthesis & Energy Flow:</strong> Ready for your next study module.</li>
            <li><strong>Linear Equations Diagnostic:</strong> Remedial practice quiz available to boost topic mastery to 90%+.</li>
            <li><strong>Offline Download Packs:</strong> STEM lesson packs stored locally on your device.</li>
          </ul>
        </div>

        <div style="text-align: center; padding-top: 16px; border-top: 1px solid #E5E2DA; font-size: 11px; color: #89909E;">
          Sent automatically via Brevo SMTP • Sender: ${process.env.SENDER_EMAIL || 'mohamedsubhan155@gmail.com'} • Offline Orbit
        </div>
      </div>
    </div>
  `;

  return await sendBrevoEmail({
    toEmail: recipientEmail,
    toName: userName,
    subject,
    htmlContent
  });
};
