import { Button, TextField, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { MdFileUpload, MdDelete } from "react-icons/md";

const ImageField = ({ 
  name, 
  label, 
  className, 
  onChange, 
  error, 
  multiple = false,
  existingImage = null,
  apiKey = "1f46439ed9eaada585d3c6fd465befe8"
}) => {
  const [previews, setPreviews] = useState(() => {
    if (existingImage) {
      return multiple 
        ? (Array.isArray(existingImage) ? existingImage : [existingImage]).map(url => ({ preview: url }))
        : [{ preview: existingImage }];
    }
    return [];
  });
  
  const [uploadedUrls, setUploadedUrls] = useState(() => {
    if (existingImage) {
      return multiple 
        ? (Array.isArray(existingImage) ? existingImage : [])
        : [existingImage];
    }
    return [];
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (existingImage) {
      const newPreviews = multiple 
        ? (Array.isArray(existingImage) ? existingImage : []).map(url => ({ preview: url }))
        : [{ preview: existingImage }];
      setPreviews(newPreviews);
      
      const newUrls = multiple 
        ? (Array.isArray(existingImage) ? existingImage : [])
        : [existingImage];
      setUploadedUrls(newUrls);
    }
  }, [existingImage, multiple]);

  const uploadToImgBB = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", apiKey);

    try {
      const response = await fetch("https://api.imgbb.com/1/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      
      if (data.success) {
        return data.data.url;
      } else {
        console.error("ImgBB upload failed:", data);
        return null;
      }
    } catch (error) {
      console.error("Error uploading to ImgBB:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Create previews
    const newPreviews = [];
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        newPreviews.push({ file, preview: reader.result });
        if (newPreviews.length === files.length) {
          setPreviews(multiple ? [...previews, ...newPreviews] : newPreviews);
        }
      };
      reader.readAsDataURL(file);
    });

    // Upload to ImgBB
    const uploadPromises = files.map(file => uploadToImgBB(file));
    const urls = await Promise.all(uploadPromises);
    const validUrls = urls.filter(url => url !== null);
    
    const newUrls = multiple ? [...uploadedUrls, ...validUrls] : validUrls;
    setUploadedUrls(newUrls);
    
    // Call the onChange prop with the uploaded URLs
    if (onChange) {
      onChange(multiple ? newUrls : newUrls[0] || null);
    }
  };

  const removeImage = (index) => {
    const newPreviews = [...previews];
    newPreviews.splice(index, 1);
    setPreviews(newPreviews);

    const newUrls = [...uploadedUrls];
    newUrls.splice(index, 1);
    setUploadedUrls(newUrls);

    if (onChange) {
      onChange(multiple ? newUrls : newUrls[0] || null);
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <TextField
        name={name}
        label={label}
        focused
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        helperText={error?.message}
        error={!!error}
        InputLabelProps={{ shrink: true }}
        inputProps={{ multiple }}
      />

      {loading && (
        <div className="flex justify-center my-2">
          <CircularProgress size={24} />
        </div>
      )}

      {previews.length > 0 && (
        <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {previews.map((item, index) => (
            <div key={index} className="relative group">
              <img
                src={item.preview}
                alt={`Preview ${index + 1}`}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <Button
                variant="contained"
                color="error"
                size="small"
                className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
                sx={{ minWidth: '30px', width: '30px', height: '30px', padding: 0 }}
              >
                <MdDelete />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageField;