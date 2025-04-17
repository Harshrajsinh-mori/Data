const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const app = express();
const port = process.env.PORT || 3000;

app.get('/access_token', (req, res) => {
  const appID = process.env.APP_ID;
  const appCertificate = process.env.APP_CERTIFICATE;
  const channelName = req.query.channelName;
  const uid = req.query.uid || 0;
  const role = RtcRole.PUBLISHER;
  const expireTime = 3600;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpireTime = currentTime + expireTime;

  const token = RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channelName, uid, role, privilegeExpireTime);
  return res.json({ token });
});

app.listen(port, () => {
  console.log(`Token server listening at http://localhost:${port}`);
});