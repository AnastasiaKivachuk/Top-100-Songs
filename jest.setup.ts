import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'jest-scss-transform';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
