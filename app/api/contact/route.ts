import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

const DESTINATION_EMAIL = 'sabih0675@gmail.com';
const web3formsAccessKey = process.env.WEB3FORMS_ACCESS_KEY;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      );
    }

    const emailSubject = `New Contact Form Submission from ${name}`;
    const emailHtml = `
      <h2>New Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'N/A'}</p>
      <p><strong>Estimated Budget:</strong> ${budget || 'N/A'}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap; background-color: #f4f4f5; padding: 15px; border-radius: 8px; border: 1px solid #e4e4e7;">${message}</p>
    `;

    // ── APPROACH 1: RESEND (If configured and key is present) ──
    if (resend) {
      try {
        const { data, error } = await resend.emails.send({
          from: 'DevNexa Contact Form <onboarding@resend.dev>',
          to: DESTINATION_EMAIL,
          subject: emailSubject,
          html: emailHtml,
          replyTo: email,
        });

        if (!error) {
          return NextResponse.json({ success: true, provider: 'resend', messageId: data?.id });
        }
        console.warn('Resend failed, checking fallback...', error);
      } catch (err: any) {
        console.warn('Resend threw an error, checking fallback...', err.message);
      }
    }

    // ── APPROACH 2: WEB3FORMS (Easy, free, no credit card required) ──
    if (web3formsAccessKey) {
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: web3formsAccessKey,
            subject: emailSubject,
            from_name: 'DevNexa Contact',
            name,
            email,
            company: company || 'N/A',
            budget: budget || 'N/A',
            message,
          }),
        });

        const data = await res.json();
        if (res.ok && data.success) {
          return NextResponse.json({ success: true, provider: 'web3forms' });
        }
        return NextResponse.json({ error: data.message || 'Web3Forms submission failed' }, { status: 400 });
      } catch (err: any) {
        return NextResponse.json({ error: `Web3Forms error: ${err.message}` }, { status: 500 });
      }
    }

    // ── APPROACH 3: FALLBACK MOCK (For development) ──
    console.log('--- DevNexa Local Email Log ---');
    console.log('To:', DESTINATION_EMAIL);
    console.log('Subject:', emailSubject);
    console.log('Body:', body);
    console.log('-------------------------------');

    return NextResponse.json({
      success: true,
      isMock: true,
      message: 'Form submitted successfully (logged to server console). Set WEB3FORMS_ACCESS_KEY or RESEND_API_KEY to receive emails.',
    });

  } catch (error: any) {
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
