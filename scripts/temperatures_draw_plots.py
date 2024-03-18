import matplotlib.pyplot as plt
import numpy as np

# Data preparation
temperatures = np.array([0.1, 0.5, 0.9])
data = {
    "medianSensitivity": np.array([45, 29, 35]),
    "medianSpecifity": np.array([21, 14, 25]),
   
}
WIDTH=0.05
plt.figure()
plt.bar(temperatures, data['medianSensitivity'], color='skyblue', label='Median Sensitivity',width=WIDTH)
plt.bar(temperatures+WIDTH, data['medianSpecifity'], color='lightgreen', label='Median Specificity',width=WIDTH)
plt.xlabel('Temperature')
plt.ylabel('[%]')
plt.legend()
plt.title('Median Sensitivity and Median Specificity by Temperature')
plt.show()





