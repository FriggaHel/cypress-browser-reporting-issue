# Purpose

The purpose of that project is to demonstrate a bug in Cypress 11+.

## Context

When cypress is executed against a browser installed in a non-standart location, Cypress UI is reporting the wrong browser.

Cypress UI does not reflect the actual browser. The console output is still correct.

It impacts **Cypress 11+** on **Windows** and **macOS**

## Example

This repo do the following steps.
- Check browser versions available in default locations
- [mac only] Remove installed version of Chrome / Firefox / Edge
- Install Chromium 112 in `/tmp` (mac) or `C:\chromium-XXX\` (windows)
- Execute `cypress run --headed -b /path/to/custom/chromium`
- [mac-only] Record complete screen
- Export videos (cypress + screen recording)

### macOS + cypress@12

Reference run: https://github.com/FriggaHel/cypress-browser-reporting-issue/actions/runs/4134285919

- Observe that installed versions by default versions are `Safari 16.3`, `Chrome 109`, `Edge 109` and `Firefox 109`.
https://github.com/FriggaHel/cypress-browser-reporting-issue/actions/runs/4134285919/jobs/7145239715#step:3:1
![Installed browsers](/medias/cypress12/available-browser-versions.png)

- Observe in CLI output that it's targeting `Custom Chromium 112`
https://github.com/FriggaHel/cypress-browser-reporting-issue/actions/runs/4134285919/jobs/7145239715#step:8:30
![CLI Reported version](/medias/cypress12/cli-reported-version.png)

- Observe that Cypress UI is reporting `Electron 106`
From artifact `video-macos-cypress12`: https://github.com/FriggaHel/cypress-browser-reporting-issue/suites/10879103472/artifacts/548954028
![UI Reported version](/medias/cypress12/ui-reported-browser.png)

- Observe that Cypress as launched `Chromium` as expected.
From artifact `video-macos-cypress12`: https://github.com/FriggaHel/cypress-browser-reporting-issue/suites/10879103472/artifacts/548954028
![UI Reported version](/medias/cypress12/video-recording.png)

## Expected - macOS + cypress@10

Reference run: https://github.com/FriggaHel/cypress-browser-reporting-issue/actions/runs/4134285921


- Observe that installed versions by default versions are `Safari 16.3`, `Chrome 109`, `Edge 109` and `Firefox 109`.
https://github.com/FriggaHel/cypress-browser-reporting-issue/actions/runs/4134285921/jobs/7145601039#step:3:1
![Installed browsers](/medias/cypress10/available-browser-versions.png)

- Observe in CLI output that it's targeting `Custom Chromium 112`
https://github.com/FriggaHel/cypress-browser-reporting-issue/actions/runs/4134285921/jobs/7145601039#step:8:33
![CLI Reported version](/medias/cypress10/cli-reported-version.png)

- Observe that Cypress UI is reporting `Custom Chromium 112` as expected
From artifact `video-macos-cypress10`: https://github.com/FriggaHel/cypress-browser-reporting-issue/suites/10879103478/artifacts/548981083
![UI Reported version](/medias/cypress10/ui-reported-browser.png)

- Observe that Cypress as launched `Chromium` as expected.
From artifact `video-macos-cypress10`: https://github.com/FriggaHel/cypress-browser-reporting-issue/suites/10879103478/artifacts/548981083
![UI Reported version](/medias/cypress10/video-recording.png)
