# Google Apps Script email setup — corrected workflow

The website now sends the form to its own Next.js route at `/api/contact`. The
server route then calls Google Apps Script and reads the real response. This
removes the old `no-cors` behaviour that could show a false success message.

## 1. Create and authorise the script

1. Open Google Apps Script and create a **standalone project**.
2. Replace the default content with `code.gs` from this folder.
3. Save the project.
4. In **Project Settings**, set the time zone to `Asia/Colombo`.
5. At the top of the editor, select the function `authorizeAndTest`.
6. Click **Run**.
7. Complete Google's permission screens.
8. Confirm that a test email reaches `sanijasathnindu85@gmail.com`.

Do not continue until `authorizeAndTest()` sends the test email.

## 2. Test the complete email logic inside Apps Script

1. Select `testDoPost` in the function menu.
2. Click **Run**.
3. It should send two emails to `sanijasathnindu85@gmail.com`:
   - the owner enquiry;
   - the simulated client receipt.
4. Open **Executions** in the left sidebar and confirm the run is `Completed`.

## 3. Deploy correctly

1. Select **Deploy → New deployment**.
2. Choose **Web app**.
3. Set **Execute as** to **Me**.
4. Set **Who has access** to **Anyone**.
5. Click **Deploy**.
6. Copy the URL ending in `/exec`.

Never use the URL ending in `/dev` on the website.

### After changing code later

Saving the editor is not enough for an existing web-app deployment. Use:

1. **Deploy → Manage deployments**.
2. Select the active deployment.
3. Click **Edit**.
4. Under **Version**, choose **New version**.
5. Click **Deploy**.

Keep the same `/exec` URL after updating the deployment.

## 4. Configure the Next.js website

Create `.env.local` in the project root:

```env
NEXT_PUBLIC_SITE_URL=https://www.your-real-domain.lk
GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

Restart the server after changing environment variables:

```bash
npm run dev
```

For production, rebuild and restart:

```bash
npm run build
npm start
```

## 5. Verify both endpoints

Open this URL in a browser:

```text
https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

It must display JSON containing `"ok":true`.

Then open the website API health endpoint:

```text
http://localhost:3000/api/contact
```

It must show:

```json
{
  "ok": true,
  "service": "APEX contact API",
  "googleScriptConfigured": true
}
```

Finally, submit the website form using an email address you can check.

## Troubleshooting

### No Apps Script execution appears

The request is not reaching the deployment. Check:

- the environment variable name is exactly `GOOGLE_SCRIPT_URL`;
- the URL ends in `/exec`;
- the Next.js server was restarted;
- the deployment access is `Anyone`;
- the current deployment points to the newest script version.

### Execution appears as Failed

Open the failed execution and read its exception. Common causes are:

- MailApp permission was not authorised;
- the daily recipient quota was reached;
- an old deployment version is still active;
- the Google account or Workspace administrator blocks external sending.

### Owner receives mail but client does not

Check the client's Spam, Promotions and Updates folders. Also verify that the
entered address is correct. The Apps Script execution log will show whether the
client receipt call completed.

### Important hosting requirement

The new `/api/contact` route requires a Next.js server-capable deployment such
as Vercel, Netlify with Next.js support, or a Node.js server. A fully static
GitHub Pages export cannot execute this API route.
