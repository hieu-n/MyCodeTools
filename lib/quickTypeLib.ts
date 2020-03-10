import {
  InputData,
  jsonInputForTargetLanguage,
  quicktype,
} from 'quicktype-core';

export async function quicktypeJSON(targetLanguage: string, typeName: string, jsonString: string) {
  const jsonInput = jsonInputForTargetLanguage(targetLanguage);

  // We could add multiple samples for the same desired
  // type, or many sources for other types. Here we're
  // just making one type from one piece of sample JSON.
  await jsonInput.addSource({
    name: typeName,
    samples: [jsonString],
  });

  const inputData = new InputData();
  inputData.addInput(jsonInput);

  return quicktype({
    inputData,
    lang: targetLanguage,
    combineClasses: true,
    allPropertiesOptional: false,
    inferEnums: false,
    inferUuids: false,
    inferIntegerStrings: false,
    inferDateTimes: true,
    inferBooleanStrings: false,
    rendererOptions: {
      'array-type': 'list',
      features: 'attributes-only',
    },
  });
}

export async function quickTypeGen({ prefix, jsonString }: { prefix: string; jsonString: string }): Promise<string> {
  const result = await quicktypeJSON(
    'csharp',
    prefix,
    jsonString,
  );
  let text = result.lines.join('\n');
  text = text.replace(/JsonProperty\("/g, 'JsonPropertyName("');
  text = text.replace(/public partial class/g, 'public class');
  text = text.replace(/namespace QuickType\s+{/, '');
  text = text.replace(/}\s*$/, '');
  text = text.replace(/using \S+;/g, '');
  text = text.replace(/, NullValueHandling = NullValueHandling.Ignore/g, '');
  text = text.replace(/public (\S+) (\S+) {/g, 'public $1? $2 {');
  text = text.replace(/\?\?/g, '?');
  text = text.replace(/public Uri/g, 'public string');

  const classNameRegex = /public class (\S+)/g;
  // text = text.replace(classNameRegex, `public class ${prefix}$1`);

  let m;
  while ((m = classNameRegex.exec(text)) !== null) {
    // if (m.index === classNameRegex.lastIndex) classNameRegex.lastIndex += 1;
    const className = m[1];
    if (className.startsWith(prefix)) continue;
    text = text.replace(new RegExp(`\\b${className}\\b`, 'g'), `${prefix}${className}`);
  }

  text = text.trim();
  return text;
}
