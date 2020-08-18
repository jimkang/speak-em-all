/* global process, Buffer */

var apiKey = require('./config').googleTTSAPIKey;
var oknok = require('oknok');
var bodyMover = require('request-body-mover');
var request = require('request');
var fs = require('fs');
var minimist = require('minimist');

const endpointURL = 'https://texttospeech.googleapis.com/v1/text:synthesize';

var { textFile, outFile, format, voice } = minimist(process.argv.slice(2));

if (!textFile || !outFile) {
  console.log(
    `Usage: node speak-em
  --textFile <path to text file>
  --outFile <path where audio file should go>
  --format <OGG_OPUS, MP3, LINEAR16, defaults to OGG_OPUS>
  --voice <One of these https://cloud.google.com/text-to-speech/ if you're using Google. Defaults to en-US-Wavenet-D.`
  );
  process.exit();
}

if (!format || typeof format !== 'string') {
  format = 'OGG_OPUS';
}
if (!voice || typeof voice !== 'string') {
  voice = 'en-US-Wavenet-D';
}

const text = fs.readFileSync(textFile, { encoding: 'utf8' });
callTTS(text, oknok({ ok: saveAudio, nok: handleError }));

function callTTS(text, done) {
  var reqOpts = {
    method: 'POST',
    json: true,
    url: endpointURL + '?key=' + apiKey,
    body: {
      input: { text },
      // TODO: Provide arg for language, speakingRate.
      voice: { languageCode: 'en-US', name: voice },
      audioConfig: { audioEncoding: format, speakingRate: 1.0 }
    }
  };
  request(reqOpts, bodyMover(done));
}

function saveAudio(apiResult, done) {
  fs.writeFile(
    outFile,
    Buffer.from(apiResult.audioContent, 'base64'),
    { encoding: null },
    done
  );
}

function handleError(error) {
  if (error) {
    console.error(error, error.stack);
  }
}
