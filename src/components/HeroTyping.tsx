"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  prefix: string;
  words: string[];
};

const TYPING_MS = 95;
const ERASING_MS = 55;
const HOLD_MS = 1300;

export default function HeroTyping({ prefix, words }: Props) {
  const [wordIndex, setWordIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = useMemo(() => words[wordIndex % words.length] || "", [wordIndex, words]);
  const longestWord = useMemo(
    () => words.reduce((acc, word) => (word.length > acc.length ? word : acc), ""),
    [words]
  );

  useEffect(() => {
    if (!currentWord) return;

    if (!isDeleting && typed === currentWord) {
      const hold = window.setTimeout(() => setIsDeleting(true), HOLD_MS);
      return () => window.clearTimeout(hold);
    }

    if (isDeleting && typed.length === 0) {
      const advance = window.setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }, 40);
      return () => window.clearTimeout(advance);
    }

    const next = isDeleting ? currentWord.slice(0, Math.max(0, typed.length - 1)) : currentWord.slice(0, typed.length + 1);
    const timeout = window.setTimeout(
      () => setTyped(next),
      isDeleting ? ERASING_MS : TYPING_MS
    );

    return () => window.clearTimeout(timeout);
  }, [currentWord, isDeleting, typed, words.length]);

  return (
    <h1 className="typing-headline mono" aria-label={`${prefix}${currentWord}`}>
      <span className="typing-slot" aria-hidden="true">
        <span className="typing-ghost">
          {prefix}
          {longestWord}
        </span>
        <span className="typing-live">
          <span>{prefix}</span>
          <span>{typed}</span>
          <span className="caret">|</span>
        </span>
      </span>
      <span className="sr-only">
        {prefix}
        {typed}
      </span>
    </h1>
  );
}
