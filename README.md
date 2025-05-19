<div align="center">
<h1>
  <img src="https://raw.githubusercontent.com/open-audio-stack/open-audio-stack-registry/refs/heads/main/src/assets/open-audio-stack-logo.svg" alt="Open Audio Stack Logo"><br />
  Open Audio Stack
</h1>
<p>Audio registry specification and API with searchable list of packages</p>
  <p>
    <a href="specification.md">Registry Specification</a>
    ⦁︎
    <a href="https://open-audio-stack.github.io/open-audio-stack-registry">Registry API</a>
    ⦁︎
    <a href="https://github.com/orgs/open-audio-stack/projects">Roadmap</a>
  </p>
<p>

![Test](https://github.com/open-audio-stack/open-audio-stack-registry/workflows/Test/badge.svg)
![Release](https://github.com/open-audio-stack/open-audio-stack-registry/workflows/Release/badge.svg)
<a href="https://discord.com/invite/9D94f98PxP" target="_blank"><img src="https://img.shields.io/badge/chat-on%20discord-7289DA.svg" alt="Join the chat at Discord"></a>

![Open Audio Stack - Registry - Specification 1.0.0](/src/assets/open-audio-stack-diagram-registry.svg)

</div>

# open-audio-stack-site

Website for Open Audio Stack with tools to create Plugin, Preset and Project packages.

## Developer information

Open Audio Stack Registry was built using:

- NodeJS 20.x
- TypeScript 5.x
- eslint 9.x
- prettier 3.x
- vitest 1.x

## Developer installation

Install dependencies using:

    npm install

## Developer usage

Run dev commands using:

    npm run lint
    npm run format
    npm run dev
    npm test

Create a production build using:

    npm run build

Run the production build:

    npm start

## Developer deployment

This package is versioned using git tags:

    npm version patch
    git push && git push origin --tags

GitHub Actions will automatically publish the site to Github pages at:

    https://open-audio-stack.github.io/open-audio-stack-site

## Contact

For more information please contact kmturley
