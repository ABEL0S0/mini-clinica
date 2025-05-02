import 'dotenv/config';
import { ExpoConfig, ConfigContext } from '@expo/config';

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'mini-clinica',
  slug: 'mini-clinica',
  version: '1.0.0',
  extra: {
    apiUrl: process.env.REACT_APP_API_URL
  }
});
