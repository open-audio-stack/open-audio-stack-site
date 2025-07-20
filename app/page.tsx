'use client';
import styles from '../styles/page.module.css';
import { usePathname } from 'next/navigation';
import Header from '../components/header';

export default function Home() {
  const pathname = usePathname();

  return (
    <div className={styles.page}>
      <Header pathname={pathname} />
      <section className={styles.section}>
        <main className={styles.mainColumns}>
          <div className={styles.card}></div>
          <p className={styles.message}>
  Open Audio Stack is a newly created set of open-source audio package management software and standards. The 

  goal is to simplify the distribution and installation of FOSS plugins, presets, projects, and eventually 
also 
  samples and MIDI.
          </p>
          <p className={styles.message}>
  Platforms that have currently integrated OAS as of July 2025:
  <br/>
  <a href="https://studiorack.github.io/studiorack-site">StudioRack</a>
  <br/>
  <a href="https://owlplug.com">OwlPlug</a>
          </p>
          <p className={styles.message}>
  The registry API can be accessed <a 
href="https://open-audio-stack.github.io/open-audio-stack-registry">here</a>
          </p>
          <p className={styles.message}>
  The npm package can be accessed <a href="https://www.npmjs.com/package/@open-audio-stack/core">here</a>
          </p>
          <p className={styles.message}>
  For any inquiries, <a href="mailto:hello@kimturley.co.uk">get in touch</a>
          </p>
          <p className={styles.message}>
  Our Github is <a href="https://github.com/open-audio-stack">here</a>
          </p>
          <p className={styles.message}>
          If you wish to make Open Audio Stack an official location for your users to upload presets for your plugin, please apply the following badge to your project.
          <br/><br/>
          <a href="https://github.com/open-audio-stack" target="_blank"><img src="https://raw.githubusercontent.com/open-audio-stack/open-audio-stack-registry/refs/heads/main/src/assets/powered-by-open-audio-stack.svg" alt="Powered by Open Audio Stack"></a>
          <br/>
          <p className={styles.message}>
          Copy and paste the below text to render the badge:
          </p>
          <code>&lt;a href=&quot;https://github.com/open-audio-stack&quot; target=&quot;_blank&quot;&gt;&lt;img 
src=&quot;https://raw.githubusercontent.com/open-audio-stack/open-audio-stack-registry/refs/heads/main/src/assets/powered-by-open-audio-stack.svg&quot; alt=&quot;Powered by Open Audio Stack&quot;&gt;&lt;/a&gt;</code>
          </p>
        </main>
      </section>
    </div>
  );
