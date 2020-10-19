import json
import os
import sys
import subprocess

input_file = sys.argv[1]
input_file = input_file.split('/')[-1]

output_file = input_file.split('.')[0]
json_file = output_file + '.json'
output_file = output_file + '.jpg'

input_bucket = 's3://hack-input/input/{}'

output_bucket =  's3://hack-input/output/{}'

### Begin Function Definitions ###

def gen_metadata(raw_output):
  identifiedEntities = raw_output.splitlines()[2].split()[4:-2]

  for x in range(len(identifiedEntities)-1):
    if x % 2 == 0:
      identifiedEntities[x], identifiedEntities[x+1] = identifiedEntities[x+1][:-1], identifiedEntities[x]

  iterator = iter(identifiedEntities)

  results_dict = dict(zip(iterator, iterator))

  with open("/usr/src/app/inference/output/" + json_file, "w") as output:
    json.dump(results_dict, output)

### End Function Definitions ###

# Download image
download_image = subprocess.call(['aws',
                            's3',
                            'cp',
                            input_bucket.format(input_file),
                            "/usr/src/app/yolov5/" + input_file])


# Apply model
apply_model = os.popen("python3 yolov5/detect.py --source /usr/src/app/yolov5/" + input_file + " --weights /usr/src/app/hack_01.pt").read()
print(apply_model)

# Generate metadata
gen_metadata(apply_model)

# Upload JSON file
upload_image = subprocess.call(['aws', 
                      's3',
                      'cp',
                      '/usr/src/app/inference/output/{}'.format(json_file),
                      output_bucket.format(json_file)])

# Upload resulting image
upload_image = subprocess.call(['aws', 
                      's3',
                      'cp',
                      '/usr/src/app/inference/output/{}'.format(output_file),
                      output_bucket.format(output_file)])