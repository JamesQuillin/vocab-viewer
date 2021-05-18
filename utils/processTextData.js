const path = require('path');

const n5Data = require('../data/n5.json');
const n4Data = require('../data/n4.json');
const n3Data = require('../data/n3.json');
const n2Data = require('../data/n2.json');
const n1Data = require('../data/n1.json');

function processTextData(rawTextData) {
  return new Promise((resolve, reject) => {
    let kuromoji = require('kuromoji');
    kuromoji.builder({ dicPath: "./resources/app/dict/" }).build(function (err, tokenizer) {
      let tokenizedFileData = tokenizer.tokenize(rawTextData);
      resolve(processTokenizedArray(tokenizedFileData));
    });
  });

  function processTokenizedArray(arr) {
    arr.forEach(obj => {
      for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
  
          // remove unnecessary props from tokenized words
          if (
                 prop == 'word_id' 
              || prop == 'word_type' 
              || prop == 'word_position' 
              || prop == 'pos_detail_1' 
              || prop == 'pos_detail_2' 
              || prop == 'pos_detail_3'
          ) {
            delete obj[prop];
          }
  
          // set the obj.word property
          if (prop == 'basic_form' || prop == 'surface_form' || prop == 'conjugated_form') {
            obj.word = obj.basic_form;
            delete obj.basic_form;
            if (obj.surface_form) delete obj.surface_form;
            if (obj.conjugated_form) delete obj.conjugated_form;
          }
  
          // replace pos (part of speech) prop with pos_en (english) 
          // and pos_jp (japanese) for ease of use
          if (prop == 'pos'){
            switch(obj[prop]) {
              case '記号':
                obj.pos_en = 'symbol';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '名詞':
                obj.pos_en = 'noun';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '助詞':
                obj.pos_en = 'particle';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '助動詞':
                obj.pos_en = 'auxiliary verb​';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '感動詞':
                obj.pos_en = 'interjection';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '副詞':
                obj.pos_en = 'adverb';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '形容詞':
                // obj.pos_en = 'adjective; i-adjective';
                // obj.pos_en = 'i-adjective';
                obj.pos_en = 'adjective';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '動詞':
                obj.pos_en = 'verb';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '接頭詞':
                obj.pos_en = 'prefix';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '連体詞':
                // obj.pos_en = 'pre-noun adjectival; adnominal adjective';
                // obj.pos_en = 'na-adjective';
                obj.pos_en = 'adjective';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case '接続詞':
                obj.pos_en = 'conjunction';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
              case 'フィラー':
                obj.pos_en = 'filler';
                obj['pos_jp'] = obj[prop];
                delete obj[prop];
                break;
  
              default:
                // code block
            }
          }
  
          if (prop == 'reading') delete obj.reading;
          if (prop == 'pronunciation') delete obj.pronunciation;
          if (prop == 'conjugated_type') delete obj.conjugated_type;
  
          // make 'empty' entries easier to read
          if (obj[prop] && obj[prop] == '*') {
            delete obj[prop];
          }
        }
      }
    });
  
    // filter out unwanted words
    arr = arr.filter( entry => {
      return (
             entry.word != '*'
          && entry.word != '０'
          && entry.word != '１'
          && entry.word != '２'
          && entry.word != '３'
          && entry.word != '４'
          && entry.word != '５'
          && entry.word != '６'
          && entry.word != '７'
          && entry.word != '８'
          && entry.word != '９'
      );
    });
  
    // filter out unwanted categories of words
    arr = arr.filter( entry => {
      return (
           entry.pos_en != 'symbol'
        && entry.pos_en != 'particle'
        && entry.pos_en != 'auxiliary verb​'
        && entry.pos_en != 'interjection'
        && entry.pos_en != 'prefix'
        && entry.pos_en != 'filler'
      );
    });
  
    // copy words to new array, ommitting duplicates
    let arrayWithoutDuplicates = [];
    arr.forEach( inputWord => {
      let index = arrayWithoutDuplicates.findIndex( entry => entry.word == inputWord.word );
      if (index == -1) {
        arrayWithoutDuplicates.push(inputWord);
        arrayWithoutDuplicates[arrayWithoutDuplicates.length - 1].count = 1;
      } else {
        arrayWithoutDuplicates[index].count++;
      }
    });
  
    // augment each word with a JLPT level and definition. by doing it in this way, words
    // which aren't in the n1-n5 list will be easily identifiable as they will lack a level
    // and definition. they can then be easily filtered out or used for other purposes
    arrayWithoutDuplicates.forEach ( entry => {
      if (n5Data[entry.word]) {
        entry.level = n5Data[entry.word].level;
        entry.definition = n5Data[entry.word].definition;
        if (n5Data[entry.word].reading) {
          entry.reading = n5Data[entry.word].reading;
        }
      } else if (n4Data[entry.word]) {
        entry.level = n4Data[entry.word].level;
        entry.definition = n4Data[entry.word].definition;
        if (n4Data[entry.word].reading) {
          entry.reading = n4Data[entry.word].reading;
        }
      } else if (n3Data[entry.word]) {
        entry.level = n3Data[entry.word].level;
        entry.definition = n3Data[entry.word].definition;
        if (n3Data[entry.word].reading) {
          entry.reading = n3Data[entry.word].reading;
        }
      } else if (n2Data[entry.word]) {
        entry.level = n2Data[entry.word].level;
        entry.definition = n2Data[entry.word].definition;
        if (n2Data[entry.word].reading) {
          entry.reading = n2Data[entry.word].reading;
        }
      } else if (n1Data[entry.word]) {
        entry.level = n1Data[entry.word].level;
        entry.definition = n1Data[entry.word].definition;
        if (n1Data[entry.word].reading) {
          entry.reading = n1Data[entry.word].reading;
        }
      }
    });
    
    CURRENT_LIST_FULL_DATA = arrayWithoutDuplicates;
    return arrayWithoutDuplicates;
  }
}

exports.processTextData = processTextData;
