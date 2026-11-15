# For Vinara ❤️

A small interactive birthday website: a song, a cake with 27 candles she can
blow out through her phone's microphone, a birthday greeting, and a letter in
a book. It is a plain static site, so it runs on GitHub Pages with no server,
no accounts and no database.

## What happens when she opens the link

1. **Welcome.** "For you, Baba ❤️" and a button, "Open Your Surprise".
2. **Song and cake.** Tapping the button starts your recording and shows the
   cake with 27 flickering candles. Play/pause, replay and mute sit in the top
   corner, and there is a quiet "Skip to the candles" link.
3. **Candles.** When the song ends: "Make a wish, Baba. ❤️", then two choices,
   "Enable Microphone 🎤" or "Tap to Blow Instead ❤️". Both end the same way:
   the flames gust, go out, smoke rises and the screen fades to dark.
4. **Greeting.** "Happy 27th Birthday, Vinara ❤️" fades in.
5. **Letter.** A book opens. Seven pages, turned by the arrows or by swiping.
   The last page stays open until she closes the tab.

## Put it online with GitHub Pages

You only need a free GitHub account and a web browser.

1. **Unzip** `vinara-birthday.zip` on a computer.
2. **Create a repository.** On github.com click **+** then **New repository**.
   Give it any name (for example `for-you`). Choose **Public**, since free
   GitHub Pages needs a public repository. Do not add a README. Click
   **Create repository**.
3. **Upload the files.** On the new repository page click **uploading an
   existing file**. Open the unzipped `vinara-birthday` folder, select
   **everything inside it** and drag it into the browser. Do not drag the
   outer folder itself.
   - The hidden `.github` folder must be included, because it holds the
     deployment recipe. On a Mac press **Cmd + Shift + .** in Finder to show
     hidden files. On Windows turn on **View → Hidden items**.
   - You do not need `node_modules` or `dist`. They are not in the ZIP.
   - Click **Commit changes**.
4. **Turn on Pages.** In the repository go to **Settings → Pages**. Under
   **Build and deployment → Source** choose **GitHub Actions**.
5. **Deploy.** Open the **Actions** tab. If a run called "Deploy to GitHub
   Pages" is not already going, click that workflow on the left, then **Run
   workflow**. Wait for the green tick, usually about a minute.
6. **Find the link.** It is shown inside the finished run, and in **Settings →
   Pages**. It looks like `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`.

If you prefer the command line:

```bash
cd vinara-birthday
git init -b main
git add .
git commit -m "Birthday site"
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git push -u origin main
```

Then do steps 4 to 6.

### About the web address

The site uses relative paths (`base: './'` in `vite.config.ts`), so it works
at `https://USERNAME.github.io/REPOSITORY/` without you typing the repository
name anywhere. It also works unchanged on a root address
(`https://USERNAME.github.io/`, a repository named `USERNAME.github.io`).

### Who can see it

A public repository and its Pages site can be opened by anyone who has the
link, and the letter text and the recording are visible in the repository.
The page asks search engines not to index it, but treat the link as private
rather than secret. You can delete the repository whenever you like.

## The voice recording

Your recording is already included at `public/audio/happy-birthday.mp3`
(converted from the .m4a you sent, 29 seconds).

To replace it later:

1. Place your MP3 file inside `public/audio` and name it `happy-birthday.mp3`.
2. On GitHub: open the `public/audio` folder, click **Add file → Upload
   files**, drop the new file in, and **Commit changes**.
3. The site redeploys by itself. Watch the **Actions** tab for the green tick,
   then refresh the link.

An iPhone Voice Memo (`.m4a`) also works: name it `happy-birthday.m4a` and
delete the `.mp3`. If neither file is present the site still runs, shows a
short "silent" note and moves on to the candles.

## Changing the words

- The letter: `src/content/birthdayLetter.ts`. One block per page.
- Everything else on screen: `src/content/siteText.ts`.

Edit the file on GitHub (pencil icon), commit, and it redeploys.

## Test it on an iPhone before sending

These things can only be checked on a real phone:

1. Open the link in **Safari**. Turn the ringer switch on and the volume up.
2. Tap "Open Your Surprise". The song should start straight away.
3. Try mute, pause and replay.
4. Tap "Enable Microphone", allow it, and blow. Hold the phone 5 to 10 cm from
   your mouth and blow at the bottom edge for about half a second.
5. Reload and try again with **Don't Allow**. You should get a friendly note
   and the "Tap to Blow Instead" button.
6. Talk normally near the phone for a few seconds while it is listening, and
   check the candles stay lit.
7. Read through all seven pages by swiping and with the arrows.
8. Repeat in Chrome on iPhone, and on an Android phone if you can.

If blowing is too hard or too easy to trigger, the numbers to adjust are at
the top of `src/hooks/useBlowDetection.ts` (`SUSTAIN_MS`, `MIN_THRESHOLD`).

## Microphone privacy

The microphone is requested only when she taps "Enable Microphone". The sound
is measured on her phone for loudness and nothing else. It is never recorded,
stored or sent anywhere, and the microphone is switched off the moment the
candles go out or she chooses to tap instead.

## Running it on your computer (optional)

Needs Node.js 20 or newer.

```bash
npm install
npm run dev      # local preview
npm run build    # production build into dist/
```

## Project layout

```
public/audio/happy-birthday.mp3   the recording
src/content/birthdayLetter.ts     the letter, page by page
src/content/siteText.ts           all other wording
src/scenes/                       Welcome, Cake, BirthdayReveal, Letter
src/components/Cake.tsx           the SVG cake and its 27 candles
src/hooks/useBirthdayAudio.ts     song playback and fallbacks
src/hooks/useBlowDetection.ts     microphone blow detection
src/styles/index.css              colours, layout and animation
.github/workflows/deploy.yml      GitHub Pages deployment
```

Built with React, TypeScript, Vite and Tailwind CSS. Animation is plain CSS
and SVG, and the fonts are bundled, so nothing loads from another website.
