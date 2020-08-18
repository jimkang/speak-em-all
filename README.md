# speak-em-all

Takes a bunch of text files, gets a bunch of audio files with the spoken content of those text files. Right now, using only Google Cloud Speech to render to speech.

## Installation

- Install Node.
- Clone this repo.
- `cd` to the project root.
- `npm install`
- Create a `config.js` file that has your Google TTS API key in it, like so:

        module.exports = {
          googleTTSAPIKey: 'your Google key here'
        };

## Usage

## Rendering a single text file to audio

    node speak-em --textFile <path to text file> --outFile <path to where the audio file should go>

(Run it without any arguments to see the help.)

## Rendering multiple text files to multiple audio files

    ./speak-em-all <textdir> <outdir> [format] [output file extension] [voice]

The last three arguments are optional, but you'll end up with no file extensions on your audio files without the extension argument.

    ./speak-em-all.sh ../quotes ../src-audio/raw

This will put a bunch of ogg files in `../src-audio/raw`.

Here is an example that uses a specific voice and produces wav files with a .wav extension:

    ./speak-em-all.sh ../quotes ../src-audio/raw LINEAR16 wav en-US-Wavenet-H

## License

BSD.
