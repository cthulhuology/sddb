// sddb.js
//
// MIT License 
// 
// Copyright (c) 2024 David J. Goehrig <dave@dloh.org> 
// 
// Permission is hereby granted, free of charge, to any person obtaining a copy 
// of this software and associated documentation files (the "Software"), to deal 
// in the Software without restriction, including without limitation the rights 
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
// copies of the Software, and to permit persons to whom the Software is 
// furnished to do so, subject to the following conditions: 
// 
// The above copyright notice and this permission notice shall be included in all 
// copies or substantial portions of the Software. 
// 
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
// SOFTWARE. 
//

const S = (x) => {
	if (typeof(x) == 'string') return { 'S' : x }
}

const N = (x) => {
	if (typeof(x) == 'number') return { 'N' : x.toString() }
}

const B = (x) => {
	if ( x instanceof Buffer) return { 'B' : x.toString('base64') }
}

const BOOL = (x) => {
	if (typeof(x) == 'boolean') return { 'BOOL' : x }
}

const L = (x) => {
	if ( x instanceof Array) return { 'L' : x.map(toDDB) }
}

const M = (x) => {
	if (typeof(x) == 'object') return { 'M' : Object.fromEntries(Object.entries(x).map( ([k,v]) => { return [ k , toDDB(v) ]})) }
}

export const toDDB = (x) => {
	return S(x)  || N(x) || B(x) || L(x) || M(x) || BOOL(x) 
}

const s = (x) => {
	if (typeof(x) == 'object' && x.hasOwnProperty('S')) return x['S'].toString()
}

const n = (x) => {
	if (typeof(x) == 'object' && x.hasOwnProperty('N')) return x['N'] * 1
}

const b = (x) => {
	if (typeof(x) == 'object' && x.hasOwnProperty('B')) return Buffer.from(x['B'],'base64')
}

const bool = (x) => {
	if (typeof(x) == 'object' && x.hasOwnProperty('BOOL')) return x('BOOL') || false
}

const l = (x) => {
	if (typeof(x) == 'object' && x.hasOwnProperty('L')) return x['L'].map(fromDDB)
}

const m = (x) => {
	if (typeof(x) == 'object' && x.hasOwnProperty('M')) return Object.fromEntries(Object.entries(x['M']).map(([k,v]) => { return [ k, fromDDB(v) ]}))
}

export const fromDDB = (x) => {
	return s(x) || n(x) || b(x) || l(x) || m(x) || bool(x)
}

