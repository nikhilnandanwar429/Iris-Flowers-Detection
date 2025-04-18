# iris.py
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.svm import SVC
import pickle

df = pd.read_csv('iris.data')
X = df.iloc[:, 0:4].values
y = df.iloc[:, 4].values

le = LabelEncoder()
y = le.fit_transform(y)

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = SVC(kernel='linear').fit(X_train, y_train)

# Save with protocol=4 for compatibility
with open('iri.pkl', 'wb') as f:
    pickle.dump(model, f, protocol=4)