'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Pencil, Plus, Trash2, X, Check, Mic, UploadCloud } from 'lucide-react';
import { upsertSpeaker, deleteSpeaker } from './actions';
import { createClient } from '@/utils/supabase/client';

export default function SpeakersClient({ initialSpeakers }) {
    const [speakers, setSpeakers] = useState(initialSpeakers || []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSpeaker, setEditingSpeaker] = useState(null);
    const [isPending, startTransition] = useTransition();
    const [selectedFile, setSelectedFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    const defaultForm = {
        name: '',
        role: '',
        organisation: '',
        bio: '',
        image: '',
        display_order: 0,
        active: true
    };

    const [formData, setFormData] = useState(defaultForm);

    const handleOpenModal = (speaker = null) => {
        if (speaker) {
            setEditingSpeaker(speaker);
            setFormData(speaker);
        } else {
            setEditingSpeaker(null);
            setFormData(defaultForm);
        }
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingSpeaker(null);
        setFormData(defaultForm);
        setSelectedFile(null);
    };

    const handleImageSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
            // Temp preview URL
            setFormData({ ...formData, image: URL.createObjectURL(e.target.files[0]) });
        }
    };

    const handleSave = async (e) => {
        e.preventDefault();

        setIsUploading(true);
        let finalImageUrl = formData.image;

        if (selectedFile) {
            try {
                const supabase = createClient();
                const fileExt = selectedFile.name.split('.').pop();
                const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;

                const { data, error } = await supabase.storage
                    .from('speakers-images')
                    .upload(fileName, selectedFile, {
                        cacheControl: '3600',
                        upsert: false
                    });

                if (error) {
                    alert(`Error uploading image: ${error.message}`);
                    setIsUploading(false);
                    return;
                }

                const { data: { publicUrl } } = supabase.storage
                    .from('speakers-images')
                    .getPublicUrl(fileName);

                finalImageUrl = publicUrl;
            } catch (err) {
                alert(`Error during upload: ${err.message}`);
                setIsUploading(false);
                return;
            }
        }

        startTransition(async () => {
            const payload = { ...formData, image: finalImageUrl };

            const res = await upsertSpeaker(payload);
            if (res.success) {
                window.location.reload();
            } else {
                alert(`Error saving speaker: ${res.error}`);
                setIsUploading(false);
            }
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this speaker?")) return;

        startTransition(async () => {
            const res = await deleteSpeaker(id);
            if (res.success) {
                setSpeakers(speakers.filter(s => s.id !== id));
            } else {
                alert(`Error deleting speaker: ${res.error}`);
            }
        });
    };

    return (
        <div className="max-w-6xl mx-auto w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-black text-primary tracking-tight mb-2">Speakers</h1>
                    <p className="text-primary/60 font-medium">Manage the speakers that appear on the Summit page.</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors shadow-lg flex items-center gap-2 whitespace-nowrap"
                >
                    <Plus size={20} /> Add Speaker
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {speakers.map(speaker => (
                    <div key={speaker.id} className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 border border-primary/10 flex flex-col relative overflow-hidden group">
                        <div className="absolute top-4 right-4 flex gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleOpenModal(speaker)} className="p-2 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-colors">
                                <Pencil size={16} />
                            </button>
                            <button onClick={() => handleDelete(speaker.id)} className="p-2 bg-red-50 text-red-600 rounded-full hover:bg-red-600 hover:text-white transition-colors">
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-20 h-20 rounded-full bg-primary/5 border border-primary/10 overflow-hidden shrink-0 flex items-center justify-center">
                                {speaker.image ? (
                                    <Image src={speaker.image} alt={speaker.name} width={80} height={80} className="w-full h-full object-cover" />
                                ) : (
                                    <Mic className="text-primary/30 w-8 h-8" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-bold text-lg text-primary leading-tight">{speaker.name}</h3>
                                <p className="text-sm font-semibold text-secondary">{speaker.role}</p>
                                {speaker.organisation && <p className="text-xs text-primary/60 mt-0.5">{speaker.organisation}</p>}
                            </div>
                        </div>

                        <div className="flex-1">
                            <p className="text-sm text-gray-600 line-clamp-3">{speaker.bio}</p>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center text-xs font-bold text-gray-400">
                            <span>Order: {speaker.display_order}</span>
                            <span className={speaker.active ? 'text-green-500' : 'text-gray-400'}>{speaker.active ? 'Active' : 'Hidden'}</span>
                        </div>
                    </div>
                ))}

                {speakers.length === 0 && (
                    <div className="col-span-full py-20 text-center border-2 border-dashed border-gray-200 rounded-3xl">
                        <Mic className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-600 mb-2">No Speakers Found</h3>
                        <p className="text-gray-400">Click "Add Speaker" to create your first speaker profile.</p>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
                    <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white/90 backdrop-blur-md z-10">
                            <h2 className="text-2xl font-black text-primary">{editingSpeaker ? 'Edit Speaker' : 'Add New Speaker'}</h2>
                            <button onClick={handleCloseModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 flex flex-col gap-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                                    <input required type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 focus:border-primary focus:ring-primary bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Role / Title *</label>
                                    <input required type="text" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 focus:border-primary focus:ring-primary bg-gray-50 focus:bg-white transition-colors" placeholder="e.g. Keynote Speaker" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Organisation</label>
                                    <input type="text" value={formData.organisation || ''} onChange={e => setFormData({ ...formData, organisation: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 focus:border-primary focus:ring-primary bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Speaker Image</label>
                                    <div className="flex flex-col gap-3">
                                        {formData.image && (
                                            <div className="w-24 h-24 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 relative group">
                                                <Image src={formData.image} alt="Preview" width={96} height={96} className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageSelect}
                                            className="w-full px-4 py-2 text-sm rounded-xl border text-gray-700 border-gray-200 focus:border-primary focus:ring-primary bg-gray-50 focus:bg-white transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                        />
                                        <p className="text-xs text-gray-500">Upload a square image. If none selected, existing image remains.</p>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Display Order</label>
                                    <input type="number" value={formData.display_order} onChange={e => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })} className="w-full px-4 py-3 rounded-xl border text-gray-700 border-gray-200 focus:border-primary focus:ring-primary bg-gray-50 focus:bg-white transition-colors" />
                                </div>
                                <div className="flex items-center">
                                    <label className="flex items-center gap-3 cursor-pointer mt-6">
                                        <input type="checkbox" checked={formData.active} onChange={e => setFormData({ ...formData, active: e.target.checked })} className="w-5 h-5 rounded text-primary focus:ring-primary border-gray-300" />
                                        <span className="text-sm font-bold text-gray-700">Active (Visible on public site)</span>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Biography *</label>
                                <textarea required rows="6" value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })} className="w-full px-4 py-3 rounded-xl border border-gray-200 text-gray-700 focus:border-primary focus:ring-primary bg-gray-50 focus:bg-white transition-colors resize-none"></textarea>
                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                                <button type="button" onClick={handleCloseModal} disabled={isPending || isUploading} className="px-6 py-3 font-bold text-gray-600 hover:bg-gray-100 rounded-xl transition-colors disabled:opacity-50">
                                    Cancel
                                </button>
                                <button type="submit" disabled={isPending || isUploading} className="px-8 py-3 font-bold text-white bg-primary hover:bg-primary/90 rounded-xl transition-colors shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-70">
                                    {isUploading ? 'Uploading Image...' : isPending ? 'Saving...' : <><Check size={20} /> Save Speaker</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
