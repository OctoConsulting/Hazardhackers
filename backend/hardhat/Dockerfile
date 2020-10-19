# FROM Nvidia PyTorch image https://ngc.nvidia.com/catalog/containers/nvidia:pytorch
FROM nvcr.io/nvidia/pytorch:20.09-py3

# Install dependencies
RUN pip install --upgrade pip

RUN git clone https://github.com/ultralytics/yolov5

RUN pip install -r yolov5/requirements.txt
RUN pip install awscli
RUN apt update
RUN apt install -y libgl1-mesa-glx

RUN useradd -ms /bin/bash hackuser

COPY ./hack_01.pt .
COPY . /usr/src/app

RUN mkdir /home/hackuser/.aws

COPY ./credentials /home/hackuser/.aws
COPY ./config /home/hackuser/.aws

# Create working directory
RUN mkdir -p /usr/src/app

RUN chown -R hackuser:hackuser /home/hackuser/.aws
RUN chown -R hackuser:hackuser /usr/src/
RUN chmod -R 777 /usr/src/app/yolov5/detect.py


USER hackuser
WORKDIR /usr/src/app

ENTRYPOINT  python3 /usr/src/app/obj_detection.py  "$INPUT_FILE"