
import sys
import cv2
import numpy as np
import matplotlib.pyplot as plt

from keras.models import load_model
model = load_model(
    '/home/prateek/Prateek/Documents/Codes/Web Development/Projects/Super-pixelation/model/generator.h5')


def fun():
    low_res = cv2.imread("./images/input/"+sys.argv[1], 1)

    height, width, channel = low_res.shape

    low_res = cv2.resize(low_res, (96, 96))

    # Convert to RGB (opencv uses BGR as default)
    low_res = cv2.cvtColor(low_res, cv2.COLOR_BGR2RGB)

    plt.imshow(low_res)

    # Rescale to 0-1.
    low_res = low_res / 255.0

    # Get super resolution image
    sr = model.predict(np.expand_dims(low_res, axis=0))[0]

    # Rescale values in range 0-255
    sr = (((sr + 1) / 2.) * 255).astype(np.uint8)

    # Convert back to BGR for opencv
    sr = cv2.cvtColor(sr, cv2.COLOR_RGB2BGR)
    # cv2.imshow('image', sr)
    # cv2.waitKey(0)
    sr = cv2.resize(sr, (width, height))
    flag = cv2.imwrite('./images/output/'+sys.argv[1]+".png", sr)

    if flag == True:
        print(1)
    else:
        print(0)


fun()
# print("gg")
