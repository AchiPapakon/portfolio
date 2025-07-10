import translation from '../../translation.json';

interface Translation {
    [T: string]: string | Translation;
}

const typedTranslation = translation as Translation;

export const translate = (value: string): string => {
    if (!value || typeof typedTranslation[value] !== 'string') {
        return '-';
    }

    return typedTranslation[value] ?? '-';
};
