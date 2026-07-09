
import axios from 'axios';
// 1. កំណត់ Base URL របស់ API អ្នក
const API_BASE = 'https://api.yourdomain.com'; 

// 2. មុខងារទាញយកបញ្ជីភេសជ្ជៈទាំងអស់ (សម្រាប់បង្ហាញក្នុង Menu)
export const getAllDrinks = async () => {
  try {
    const response = await axios.get(`${API_BASE}/drinks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all drinks:", error);
    throw error;
  }
};

// 3. មុខងារទាញយកព័ត៌មានភេសជ្ជៈតែមួយមុខ (សម្រាប់ប្រើក្នុង Mojito.tsx ជាដើម)
export const getDrinkById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE}/drinks/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching drink ${id}:`, error);
    throw error;
  }
};