const acceptedLinks = ['facebook', 'instagram', 'youtube', 'linkedin', 'twitter', 'tiktok'] as const;
export type AcceptedDomainIcons = typeof acceptedLinks[number];

const abbrevation = {
  fb: 'facebook',
  youtu: 'youtube',
};

export const getIconByDomain = (url: string): AcceptedDomainIcons | null => {
  const group = url.match(/^(?:https?:\/\/)?(?:www\.)?([^:/\n?=]+)/im);
  const socialType = group?.[1]?.split('.')[0] as AcceptedDomainIcons;

  if (socialType && ['fb', 'youtu', ...acceptedLinks].includes(socialType)) {
    return abbrevation[socialType] || socialType;
  }

  return null;
};
