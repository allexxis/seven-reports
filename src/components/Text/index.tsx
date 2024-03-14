import { StyleProp, Text as NText, TextStyle } from 'react-native';
import React, { FC } from 'react';
import es from '@src/lang/es.json';
type Props = {
   style?: StyleProp<TextStyle>;
   idIntl?: string;
   text?: string;
};
const lang: any = es;
const Text: FC<Props> = ({ idIntl, text, style }) => {
   let intl: string = idIntl ? lang[idIntl] : 'traduccion no encontrada';
   return <NText style={style}>{text ? text : intl}</NText>;
};
export default Text;
