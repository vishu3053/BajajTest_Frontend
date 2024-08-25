import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

function App() {
    const [jsonInput, setJsonInput] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [error, setError] = useState('');

    const handleJsonInputChange = (e) => {
        setJsonInput(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            const response = await axios.post('http://localhost:4000/api/v1/bfhl', parsedJson);
            setResponseData(response.data);
            setError('');
        } catch (err) {
            setError('Invalid JSON or request failed');
        }
    };

    const handleOptionChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setSelectedOptions(value);
    };

    const filterResponseData = () => {
        if (!responseData) return null;
        const filteredData = {};
        if (selectedOptions.includes('Alphabets')) {
            filteredData.alphabets = responseData.alphabets;
        }
        if (selectedOptions.includes('Numbers')) {
            filteredData.numbers = responseData.numbers;
        }
        if (selectedOptions.includes('Highest lowercase alphabet')) {
            filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
        }
        return filteredData;
    };

    return (
        <div className="App">
            <h1>21BCE5337</h1>
            <textarea 
                value={jsonInput}
                onChange={handleJsonInputChange}
                placeholder='Enter JSON here'
                rows={5}
                cols={50}
            />
            <button 
                onClick={handleSubmit}
                className="submit-button"
            >
                Submit
            </button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {responseData && (
                <>
                    <select 
                        multiple 
                        onChange={handleOptionChange}
                        className="multi-select"
                    >
                        <option value="Alphabets">Alphabets</option>
                        <option value="Numbers">Numbers</option>
                        <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
                    </select>
                    <div>
                        <h2>Filtered Response</h2>
                        <pre>{JSON.stringify(filterResponseData(), null, 2)}</pre>
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
