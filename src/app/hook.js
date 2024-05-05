import i18n from '../i18n';

export function customNavigate (navigate, to) {
    const lang = i18n.language;
    const path = `/${lang}${to}`
    return navigate(path);
}