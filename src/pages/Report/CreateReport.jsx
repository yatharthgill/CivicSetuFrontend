import React, { useState } from 'react'
import { createReport } from '../../api/reportsApi'

// --- SVG Icons (No changes here) ---
const SpinnerIcon = () => ( <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> )
const SuccessIcon = () => ( <svg className="h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> )
const ErrorIcon = () => ( <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> )
const UploadIcon = () => ( <svg className="w-8 h-8 mb-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h10a4 4 0 014 4v5a4 4 0 01-4 4h-1M9 16l3-3m0 0l3 3m-3-3v12" /></svg> )


// --- Main Component ---

export default function CreateReport(){
  // CHANGED: Added `locationName` to form state and updated default category
  const [form, setForm] = useState({ 
    title:'', 
    description:'', 
    category:'public_works', // Updated default
    severity:'low', 
    lat:'', 
    lng:'',
    locationName: '' // Added
  })

  // CHANGED: Replaced single `files` state with three separate states for each media type
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [audio, setAudio] = useState([])

  const [message, setMessage] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) =>{
    e.preventDefault()
    setMessage(null)
    setErrorMsg(null)
    setLoading(true)
    try{
      const fd = new FormData()

      // Append standard fields
      fd.append('title', form.title)
      fd.append('description', form.description)
      fd.append('category', form.category)
      fd.append('severity', form.severity)

      // CHANGED: Append location in the new format: { coordinates: [lng, lat], name: "..." }
      if (form.lat && form.lng) {
        const locationData = {
          coordinates: [parseFloat(form.lng), parseFloat(form.lat)],
          name: form.locationName
        }
        fd.append('location', JSON.stringify(locationData))
      }

      // CHANGED: Append files under their specific keys, not one 'media' key
      images.forEach(f => fd.append('images', f))
      videos.forEach(f => fd.append('videos', f))
      audio.forEach(f => fd.append('audio', f))

      await createReport(fd)
      setMessage('Report created successfully')

      // CHANGED: Reset all new state fields
      setForm({ title:'', description:'', category:'public_works', severity:'low', lat:'', lng:'', locationName: '' })
      setImages([])
      setVideos([])
      setAudio([])

    }catch(err){
      console.error(err)
      setErrorMsg(err?.response?.data?.message || 'Failed to create report')
    }finally{ setLoading(false) }
  }

  // CHANGED: New file handler to sort files into images, videos, and audio
  const handleFileChange = (e) => {
    const allFiles = Array.from(e.target.files)
    
    // Use the file 'type' property to sort
    setImages(allFiles.filter(f => f.type.startsWith('image/')))
    setVideos(allFiles.filter(f => f.type.startsWith('video/')))
    setAudio(allFiles.filter(f => f.type.startsWith('audio/')))
  }

  // Helper to render file lists
  const renderFileList = (title, files) => {
    if (files.length === 0) return null
    return (
      <div className="mt-2 text-sm text-gray-700">
        <span className="font-semibold">{title} ({files.length}):</span>
        <ul className="list-disc list-inside ml-2">
          {files.map(f => <li key={f.name}>{f.name}</li>)}
        </ul>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-gray-100 font-sans p-4">
      <div className="bg-white p-10 rounded-lg shadow-2xl w-full max-w-2xl border border-gray-200">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Submit a New Report</h2>

        {message && ( <div className="flex items-center bg-green-50 border border-green-300 text-green-800 px-4 py-3 rounded-lg mb-4 shadow-sm"><SuccessIcon /><span className="ml-2">{message}</span></div> )}
        {errorMsg && ( <div className="flex items-center bg-red-50 border border-red-300 text-red-800 px-4 py-3 rounded-lg mb-4 shadow-sm"><ErrorIcon /><span className="ml-2">{errorMsg}</span></div> )}

        <form onSubmit={submit} className="space-y-6">
          <input 
            required 
            value={form.title} 
            onChange={e=>setForm({...form,title:e.target.value})} 
            placeholder="Report Title (e.g., 'Large Pothole on Main St.')" 
            className="w-full bg-gray-50 border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
          />
          <textarea 
            required 
            value={form.description} 
            onChange={e=>setForm({...form,description:e.target.value})} 
            placeholder="Detailed Description" 
            className="w-full bg-gray-50 border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
            rows={5} 
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CHANGED: Added 'public_works' option */}
            <select value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="w-full bg-gray-50 border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300">
              <option value="public_works">Public Works</option>
              <option value="road">Road Issue</option>
              <option value="garbage">Garbage</option>
              <option value="water">Water Leak/Supply</option>
              <option value="other">Other</option>
            </select>

            <select value={form.severity} onChange={e=>setForm({...form,severity:e.target.value})} className="w-full bg-gray-50 border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300">
              <option value="low">Low Severity</option>
              <option value="medium">Medium Severity</option>
              <option value="high">High Severity</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input value={form.lat} onChange={e=>setForm({...form,lat:e.target.value})} placeholder="Latitude (Optional)" className="w-full bg-gray-50 border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" />
            <input value={form.lng} onChange={e=>setForm({...form,lng:e.target.value})} placeholder="Longitude (Optional)" className="w-full bg-gray-50 border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" />
          </div>

          {/* CHANGED: Added input for locationName */}
          <input 
            value={form.locationName} 
            onChange={e=>setForm({...form,locationName:e.target.value})} 
            placeholder="Location Name (e.g., 'Main Street, Agra')" 
            className="w-full bg-gray-50 border-gray-300 text-gray-900 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300" 
          />

          <div>
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all duration-300">
              <UploadIcon />
              <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500">Images, Videos, or Audio</p>
            </label>
            {/* CHANGED: Updated file input to use new handler and accept all types */}
            <input 
              id="file-upload" 
              type="file" 
              multiple 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*,video/*,audio/*"
            />
            
            {/* CHANGED: Show selected files sorted by type */}
            {(images.length > 0 || videos.length > 0 || audio.length > 0) && (
              <div className="mt-4">
                {renderFileList("Images", images)}
                {renderFileList("Videos", videos)}
                {renderFileList("Audio", audio)}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button 
              className="flex items-center justify-center bg-orange-600 text-white px-8 py-3 rounded-md font-medium hover:bg-orange-700 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-orange-300/50 hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-300" 
              disabled={loading}
            >
              {loading && <SpinnerIcon />}
              {loading ? 'Creating Report...' : 'Create Report'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
