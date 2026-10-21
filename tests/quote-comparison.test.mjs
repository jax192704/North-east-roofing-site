import assert from "node:assert/strict";
import test from "node:test";
import { quoteTotal } from "../lib/quote-comparison.mjs";
test("quotes compare VAT-inclusive totals and confirmed extras",()=>{assert.equal(quoteTotal("7000",false,"20",""),8400);assert.equal(quoteTotal("8000",true,"20",""),8000);assert.equal(quoteTotal("7000",false,"20","540"),8940);assert.equal(quoteTotal("100",false,"5","0"),105);});
test("missing and invalid figures never become a free quote",()=>{for(const price of ["","0","-2","NaN","Infinity"])assert.equal(quoteTotal(price,true,"20",""),null);assert.equal(quoteTotal("10",false,"-1",""),null);assert.equal(quoteTotal("10",false,"101",""),null);assert.equal(quoteTotal("10",true,"20","-1"),null);});
