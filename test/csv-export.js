const csv = require('../server/exports/csv');
const assert = require('assert');

describe('CSV', function () {
    describe('CSV Exporter', function () {

        it('Basic Export', function() {
            const res = csv.handler({
                items: [
                    {
                        type: 'text',
                        label: 'Name'
                    },
                    {
                        type: 'number',
                        label: 'Fav Number'
                    }
                ]
            }, [
                { items: ['Dave', '912'] },
            ]);
            assert.strictEqual(res, `"Name","Fav Number"
"Dave","912"`);
        });
        it('More than one submission', function() {
            const res = csv.handler({
                items: [
                    {
                        type: 'text',
                        label: 'Name'
                    },
                    {
                        type: 'number',
                        label: 'Fav Number'
                    }
                ]
            }, [
                { items: ['Dave', '912'] },
                { items: ['Hunter', '24'] },
                { items: ['The Robot', '1'] },
            ]);
            assert.strictEqual(res, `"Name","Fav Number"
"Dave","912"
"Hunter","24"
"The Robot","1"`);
        });
        it('With special characters', function() {
            const res = csv.handler({
                items: [
                    {
                        type: 'text',
                        label: '"Quoted Text"'
                    },
                    {
                        type: 'number',
                        label: 'Comma, Test'
                    }
                ]
            }, [
                { items: ['Using "Quotes"', 'And, Commas!'] },
                { items: ['Using "Quotes" Again', 'And, Commas, Again!'] },
            ]);
            assert.strictEqual(res, `"""Quoted Text""","Comma, Test"
"Using ""Quotes""","And, Commas!"
"Using ""Quotes"" Again","And, Commas, Again!"`);
        });
    });
    describe('CSV ToString', function() {
        it('Regular String', function() {
            assert.strictEqual(csv.CSVString('Hello'), '"Hello"');
        });
        it('With Commas', function() {
            assert.strictEqual(csv.CSVString('Hello, World'), '"Hello, World"');
        });
        it('With Quotes', function() {
            assert.strictEqual(csv.CSVString('"Hello World"'), '"""Hello World"""');
        });
        it('With Newlines', function() {
            assert.strictEqual(csv.CSVString('Hello\nWorld'), '"Hello\nWorld"');
        });
    });
    describe('Default File Name', function() {
        it('Test 1', function() {
            assert.strictEqual(csv.defaultFileName({ id: '2019' }), '2019.csv');
        });
        it('Test 2', function() {
            assert.strictEqual(csv.defaultFileName({ id: 'hello' }), 'hello.csv');
        });
    });
});
