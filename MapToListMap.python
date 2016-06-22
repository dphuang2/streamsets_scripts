import sys
from com.streamsets.pipeline.stage.processor.scripting import ScriptObjectFactory
from javax.script import ScriptEngineManager

if 'scriptObjectFactory' not in state:
  engine = ScriptEngineManager(sys.classLoader).getEngineByName('jython')
  state['scriptObjectFactory'] = ScriptObjectFactory(engine)

for record in records:
  try:
    list_map = state['scriptObjectFactory'].createMap(True) # True = ListMap, False = Map
    list_map['${ID}'] = record.value['indicator']
    list_map['${CT}'] = record.value['country']
    list_map['${DT}'] = record.value['date']
    list_map['${VL}'] = record.value['value']
    
    record.value = list_map

    output.write(record)

  except Exception as e:
    # Send record to error
    error.write(record, str(e))
