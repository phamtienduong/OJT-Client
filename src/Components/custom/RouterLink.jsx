import { Link } from 'react-router-dom';
import i18n from '../../i18n';

export function RouterLink({ to, children, ...rest }) {
  const lang = i18n.language;
  const path = `/${lang}${to}`
  return (
    <Link to={path} {...rest}>
      {children}
    </Link>
  )
}
