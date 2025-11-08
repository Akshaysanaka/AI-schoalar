
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/Card';
import { Scholarship } from '../types';
import { getScholarshipRecommendations } from '../services/geminiService';
import { scholarshipsAPI } from '../services/api';

const ScholarshipCard: React.FC<{ scholarship: Scholarship, recommendationReason?: string }> = ({ scholarship, recommendationReason }) => {
    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(amount);

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle>{scholarship.title}</CardTitle>
                <CardDescription>{scholarship.provider}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-grow">
                <div className="flex-grow space-y-2">
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(scholarship.amount)}</p>
                    <p className="text-sm"><span className="font-semibold">Deadline:</span> {new Date(scholarship.deadline).toLocaleDateString()}</p>
                    <p className="text-sm text-muted-foreground">{scholarship.description}</p>
                    {recommendationReason && (
                         <div className="p-3 mt-2 text-sm text-blue-800 bg-blue-100 border-l-4 border-blue-500 rounded-r-lg">
                            <span className="font-bold">Recommendation:</span> {recommendationReason}
                        </div>
                    )}
                </div>
                <button className="w-full py-2 mt-4 font-semibold text-white bg-primary rounded-md hover:bg-primary/90">
                    Apply Now
                </button>
            </CardContent>
        </Card>
    );
};


const ScholarshipFinder: React.FC = () => {
    const [userProfile, setUserProfile] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [recommendations, setRecommendations] = useState<{ id: string; reason: string }[]>([]);
    const [scholarships, setScholarships] = useState<Scholarship[]>([]);
    const [loadingScholarships, setLoadingScholarships] = useState(true);

    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const data = await scholarshipsAPI.getAll();
                setScholarships(data);
            } catch (error) {
                console.error('Error fetching scholarships:', error);
                // Fallback to mock data if API fails
                setScholarships([]);
            } finally {
                setLoadingScholarships(false);
            }
        };

        fetchScholarships();
    }, []);

    const handleGetRecommendations = async () => {
        if (!userProfile.trim()) return;
        setIsLoading(true);
        setRecommendations([]);
        try {
            const response = await getScholarshipRecommendations(userProfile, scholarships);
            const data = JSON.parse(response.text);
            setRecommendations(data.recommendations);
        } catch (error) {
            console.error("Error getting recommendations:", error);
            // Fallback for non-JSON or error
            setRecommendations([{id: '1', reason: "AI response was not valid JSON. This is a fallback."}]);
        } finally {
            setIsLoading(false);
        }
    };

    const recommendedScholarships = recommendations.map(rec => {
        const scholarship = scholarships.find(s => s._id === rec.id || s.id?.toString() === rec.id);
        return scholarship ? { ...scholarship, reason: rec.reason } : null;
    }).filter(Boolean) as (Scholarship & { reason: string })[];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold">Scholarship Finder</h1>
                <p className="text-muted-foreground">Discover opportunities tailored for you.</p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>Get AI Recommendations</CardTitle>
                    <CardDescription>
                        Tell us about yourself (e.g., your major, GPA, interests, background) and our AI will find matching scholarships.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <textarea
                        value={userProfile}
                        onChange={(e) => setUserProfile(e.target.value)}
                        placeholder="Example: I'm a sophomore studying Computer Science with a 3.8 GPA. I'm passionate about AI ethics and volunteer at a local coding camp..."
                        className="w-full p-2 border rounded-md min-h-[100px]"
                    />
                </CardContent>
                <div className="px-6 pb-6">
                    <button
                        onClick={handleGetRecommendations}
                        disabled={isLoading}
                        className="w-full px-4 py-2 font-bold text-white rounded-md bg-primary disabled:bg-gray-400 hover:bg-primary/90"
                    >
                        {isLoading ? 'Finding Matches...' : 'Get Recommendations'}
                    </button>
                </div>
            </Card>

            {recommendations.length > 0 && (
                <div>
                    <h2 className="mb-4 text-2xl font-bold">Your Top Matches</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                       {recommendedScholarships.map(scholarship => (
                          <ScholarshipCard key={scholarship.id} scholarship={scholarship} recommendationReason={scholarship.reason} />
                       ))}
                    </div>
                </div>
            )}
            
            <div>
                <h2 className="mb-4 text-2xl font-bold">All Scholarships</h2>
                {loadingScholarships ? (
                    <div className="text-center py-8">Loading scholarships...</div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {scholarships.map(scholarship => (
                            <ScholarshipCard key={scholarship._id || scholarship.id} scholarship={scholarship} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScholarshipFinder;
