import { readable } from 'svelte/store';

export const useMediaQuery = (mediaQueryString, initialValue = null) => {
    const matches = readable(initialValue, (set) => {
        if (typeof window === 'undefined') {
            return;
        }

        const m = window.matchMedia(mediaQueryString);
        set(m.matches);

        const el = (e) => set(e.matches);
        m.addEventListener("change", el);

        return () => {
            m.removeEventListener("change", el);
        };
    });

    return matches;
};
