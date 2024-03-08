import matplotlib.pyplot as plt
import numpy as np

# Data preparation
temperatures = np.array([0.1, 0.5, 0.9])
data = {
    "medianSensitivity": np.array([45, 29, 35]),
    "medianSpecifity": np.array([21, 14, 25]),
    "meanSensitivity": np.array([40, 34, 38]),
    "meanSpecifity": np.array([29, 26, 27]),
    "stdSensitivity": np.array([33, 31, 35]),
    "stdSpecifity": np.array([29, 27, 26])
}

# Simplified visualization for Median Sensitivity and Median Specificity
fig, axs = plt.subplots(1, 2, figsize=(14, 6), sharey=True)

# Median Sensitivity Chart
axs[0].bar(temperatures, data['medianSensitivity'], color='skyblue', label='Median Sensitivity')
axs[0].set_title('Median Sensitivity by Temperature')
axs[0].set_xlabel('Temperature')
axs[0].set_ylabel('Median Sensitivity')
#axs[0].set_ylim(0, max(data['medianSensitivity']) + 5)  # Adding some margin to the top

# Median Specificity Chart
axs[1].bar(temperatures, data['medianSpecifity'], color='lightgreen', label='Median Specificity')
axs[1].set_title('Median Specificity by Temperature')
axs[1].set_xlabel('Temperature')
# axs[1].set_ylabel('Median Specificity')  # Shared Y axis with the first chart
axs[1].set_ylim(0, max(data['medianSpecifity']) + 5)  # Adding some margin to the top

#plt.tight_layout()
plt.show()
