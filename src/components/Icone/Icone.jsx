import * as PhosphorIcons from '@phosphor-icons/react';
import P from 'prop-types';

const iconComponents = {
    'Code': PhosphorIcons.Code,
    'Book': PhosphorIcons.Book,
    'GraduationCap': PhosphorIcons.GraduationCap,
    'OfficeChair': PhosphorIcons.OfficeChair,
    'Cards': PhosphorIcons.Cards,
    'AddressBook': PhosphorIcons.AddressBook,
    'AirplaneTilt': PhosphorIcons.AirplaneTilt,
    'Alarm': PhosphorIcons.Alarm,
    'Airplay': PhosphorIcons.Airplay,
    'AndroidLogo': PhosphorIcons.AndroidLogo,
    'AppWindow': PhosphorIcons.AppWindow,
    'AppStoreLogo': PhosphorIcons.AppStoreLogo,
    'Archive': PhosphorIcons.Archive,
    'Backpack': PhosphorIcons.Backpack,
    'Bag': PhosphorIcons.Bag,
    'BatteryCharging': PhosphorIcons.BatteryCharging,
    'Binoculars': PhosphorIcons.Binoculars,
    'BookBookmark': PhosphorIcons.BookBookmark,
    'BookOpen': PhosphorIcons.BookOpen,
    'BracketsCurly': PhosphorIcons.BracketsCurly,
    'Briefcase': PhosphorIcons.Briefcase,
    'Broom': PhosphorIcons.Broom,
    'Browsers': PhosphorIcons.Browsers,
    'Calculator': PhosphorIcons.Calculator,
    'Calendar': PhosphorIcons.Calendar,
    'Buildings': PhosphorIcons.Buildings,
    'Bug': PhosphorIcons.Bug,
    'Certificate': PhosphorIcons.Certificate,
    'Chair': PhosphorIcons.Chair,
    'ChalkboardTeacher': PhosphorIcons.ChalkboardTeacher,
    'Chat': PhosphorIcons.Chat,
    'Circuitry': PhosphorIcons.Circuitry,
};

Icone.propTypes = {
  tamanho: P.number,
  cor: P.string,
  icone: P.string,
};

export default function Icone({ tamanho, cor, icone }) {
  if (icone && iconComponents[icone]) {
    const IconComponent = iconComponents[icone];
    return <IconComponent size={tamanho} color={cor} weight="duotone" />;
  }

}