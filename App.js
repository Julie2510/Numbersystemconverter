import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import * as Clipboard from 'expo-clipboard';

const THEME = '#7C4DFF';

function convertNumber(value, base) {
  if (!value || value === '0') return { bin: '0', dec: '0', oct: '0', hex: '0' };
  try {
    let dec = parseInt(value, base);
    if (isNaN(dec)) return { bin: '-', dec: '-', oct: '-', hex: '-' };
    return {
      bin: dec.toString(2),
      dec: dec.toString(10),
      oct: dec.toString(8),
      hex: dec.toString(16).toUpperCase(),
    };
  } catch {
    return { bin: '-', dec: '-', oct: '-', hex: '-' };
  }
}

export default function App() {
  const [inputValue, setInputValue] = useState('0');
  const [inputBase, setInputBase] = useState(10);
  const [history, setHistory] = useState([]);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 1500);
  };

  const handleKeyPress = (key) => {
    if (key === 'C') { setInputValue('0'); return; }
    if (key === '⌫') { setInputValue(p => p.length > 1 ? p.slice(0,-1) : '0'); return; }
    const newVal = inputValue === '0' ? key : inputValue + key;
    setInputValue(newVal);
    
    // Add to history
    const res = convertNumber(newVal, inputBase);
    if (res.dec !== '-') {
      setHistory(h => [{ input: newVal, base: inputBase, ...res, id: Date.now() }, ...h].slice(0, 10));
    }
  };

  const copy = async (val) => {
    if (!val || val === '-') return;
    await Clipboard.setStringAsync(val);
    showToast(`Copied ${val}`);
  };

  const getKeys = () => {
    if (inputBase === 2) return ['1', '0'];
    if (inputBase === 8) return ['1','2','3','4','5','6','7','0'];
    if (inputBase === 10) return ['1','2','3','4','5','6','7','8','9','0'];
    return ['1','2','3','4','5','6','7','8','9','0','A','B','C','D','E','F'];
  };

  const results = convertNumber(inputValue, inputBase);
  const bases = [{id: 2, label: 'BIN'}, {id: 8, label: 'OCT'}, {id: 10, label: 'DEC'}, {id: 16, label: 'HEX'}];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Base Converter</Text>
      <Text style={styles.sub}>Bin • Oct • Dec • Hex</Text>

      <View style={styles.baseRow}>
        {bases.map(b => (
          <TouchableOpacity key={b.id} onPress={() => { setInputBase(b.id); setInputValue('0'); }} style={[styles.baseBtn, inputBase===b.id && { backgroundColor: THEME }]}>
            <Text style={[styles.baseText, inputBase===b.id && styles.activeText]}>{b.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputBox}>
        <Text style={styles.inputLabel}>{bases.find(b=>b.id===inputBase).label} INPUT</Text>
        <Text style={styles.input}>{inputValue}</Text>
      </View>

      <ScrollView style={{flex: 1}}>
        <View style={styles.results}>
          <TouchableOpacity style={styles.card} onPress={() => copy(results.bin)}><View><Text style={styles.cardLabel}>BINARY</Text><Text style={styles.cardValue}>{results.bin}</Text></View><Text style={[styles.copyBtn,{color: THEME}]}>COPY</Text></TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => copy(results.oct)}><View><Text style={styles.cardLabel}>OCTAL</Text><Text style={styles.cardValue}>{results.oct}</Text></View><Text style={[styles.copyBtn,{color: THEME}]}>COPY</Text></TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => copy(results.dec)}><View><Text style={styles.cardLabel}>DECIMAL</Text><Text style={styles.cardValue}>{results.dec}</Text></View><Text style={[styles.copyBtn,{color: THEME}]}>COPY</Text></TouchableOpacity>
          <TouchableOpacity style={styles.card} onPress={() => copy(results.hex)}><View><Text style={styles.cardLabel}>HEXADECIMAL</Text><Text style={styles.cardValue}>{results.hex}</Text></View><Text style={[styles.copyBtn,{color: THEME}]}>COPY</Text></TouchableOpacity>
        </View>

        {history.length > 0 && (
          <View style={{marginTop: 15}}>
            <View style={{flexDirection:'row', justifyContent:'space-between'}}><Text style={styles.histTitle}>History</Text><TouchableOpacity onPress={()=>setHistory([])}><Text style={{color: THEME}}>Clear</Text></TouchableOpacity></View>
            {history.map(h => <Text key={h.id} style={styles.histItem}>{h.input} ({bases.find(b=>b.id===h.base).label}) → DEC {h.dec}</Text>)}
          </View>
        )}
      </ScrollView>

      <View style={styles.pad}>
        {getKeys().map(n => (
          <TouchableOpacity key={n} style={styles.key} onPress={() => handleKeyPress(n)}><Text style={styles.keyText}>{n}</Text></TouchableOpacity>
        ))}
        <TouchableOpacity style={[styles.key, styles.keyC]} onPress={() => handleKeyPress('⌫')}><Text style={styles.keyCText}>⌫</Text></TouchableOpacity>
        <TouchableOpacity style={[styles.key, styles.keyC, {backgroundColor: THEME}]} onPress={() => handleKeyPress('C')}><Text style={{color:'white', fontWeight:'800'}}>C</Text></TouchableOpacity>
      </View>

      {toast ? <View style={styles.toast}><Text style={styles.toastText}>{toast}</Text></View> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 18, paddingTop: 50 },
  title: { fontSize: 26, fontWeight: '900', textAlign: 'center', color: '#111' },
  sub: { textAlign: 'center', color: '#888', marginBottom: 15, letterSpacing: 2, fontSize: 12 },
  baseRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  baseBtn: { flex: 1, padding: 12, borderRadius: 12, backgroundColor: '#F1F1F4', alignItems: 'center' },
  baseText: { fontWeight: '700', color: '#666' },
  activeText: { color: 'white' },
  inputBox: { backgroundColor: '#F8F8FF', borderRadius: 18, padding: 18, marginBottom: 14, borderWidth: 1.5, borderColor: THEME+'30' },
  inputLabel: { fontSize: 10, color: THEME, fontWeight: '800', letterSpacing: 1 },
  input: { fontSize: 34, fontWeight: '800', textAlign: 'right', color: '#111', marginTop: 4 },
  results: { gap: 10 },
  card: { backgroundColor: '#FAFAFC', padding: 14, borderRadius: 14, borderWidth: 1, borderColor: '#F0F0F0', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  cardLabel: { color: '#999', fontSize: 10, fontWeight: '700', letterSpacing: 1, marginBottom: 3 },
  cardValue: { fontSize: 18, fontWeight: '700', color: '#111', maxWidth: 200 },
  copyBtn: { fontWeight: '800', fontSize: 12 },
  histTitle: { fontWeight: '700', marginBottom: 5 },
  histItem: { color: '#555', fontSize: 12, paddingVertical: 2 },
  pad: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', backgroundColor: '#F8F8FA', padding: 12, borderRadius: 22, marginTop: 10 },
  key: { width: '22%', padding: 16, backgroundColor: 'white', borderRadius: 14, alignItems: 'center', elevation: 2 },
  keyText: { fontSize: 18, fontWeight: '800' },
  keyC: { width: '30%', backgroundColor: '#FFF0F0' },
  keyCText: { color: '#FF5A5A', fontWeight: '800', fontSize: 18 },
  toast: { position: 'absolute', bottom: 180, alignSelf: 'center', backgroundColor: '#111', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  toastText: { color: 'white', fontWeight: '600' }
});