import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Award, Gift, Star, Target, Zap } from 'lucide-react';
import { ScratchCard } from '@/features/gamification/ScratchCard';
import { cn } from '@/lib/utils';

// MOCK DATA
const rewardsData = {
  totalPoints: 1250,
  currentStreak: 7,
  tierProgress: 75,
  tierName: 'Diamond',
  badges: [
    { id: 1, name: 'Perfect Start', icon: <Star className="w-8 h-8"/>, unlocked: true },
    { id: 2, name: 'Quick Learner', icon: <Zap className="w-8 h-8"/>, unlocked: true },
    { id: 3, name: 'Topic Master', icon: <Target className="w-8 h-8"/>, unlocked: true },
    { id: 4, name: 'Consistent', icon: <Award className="w-8 h-8"/>, unlocked: false },
    { id: 5, name: 'Weekend Warrior', icon: <Zap className="w-8 h-8"/>, unlocked: false },
  ],
  nextTierUnlocks: [
    { id: 1, title: 'Diamond Course Access', description: 'Unlock exclusive advanced courses.' },
    { id: 2, title: 'Exclusive Avatar Frame', description: 'Show off your status with a new frame.' },
    { id: 3, title: 'Personalized Coaching', description: 'Get one-on-one sessions with experts.' },
  ]
};

export default function RewardsPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Rewards & Achievements</h1>
          <p className="text-gray-500 mt-1">Unlock exciting rewards as you learn and grow.</p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Daily Scratch Cards</h2>
          <div className="flex flex-wrap gap-6">
            <ScratchCard />
            <ScratchCard isRare={true} />
            <ScratchCard />
          </div>
        </section>
        
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <Card>
            <CardHeader>
              <CardTitle>Points & Streaks</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-around items-center text-center">
              <div>
                <p className="text-4xl font-bold text-primary">{rewardsData.totalPoints.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Points</p>
              </div>
              <div>
                <p className="text-4xl font-bold flex items-center gap-2">🔥 {rewardsData.currentStreak}</p>
                <p className="text-sm text-muted-foreground">Current Streak</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tier Rewards</CardTitle>
               <p className="text-sm text-muted-foreground">Progress to {rewardsData.tierName} Tier</p>
            </CardHeader>
            <CardContent>
              <Progress value={rewardsData.tierProgress} className="h-3" />
              <p className="text-right text-sm font-medium mt-2 text-muted-foreground">{rewardsData.tierProgress}/100</p>
            </CardContent>
          </Card>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your Badge Collection</h2>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {rewardsData.badges.map(badge => (
              <div key={badge.id} className="flex flex-col items-center text-center gap-2">
                <div className={cn(
                  "w-24 h-24 rounded-lg flex items-center justify-center transition-all",
                  badge.unlocked ? 'bg-primary text-primary-foreground shadow-md' : 'bg-secondary text-secondary-foreground'
                )}>
                  {badge.icon}
                </div>
                <p className="text-sm font-medium text-center">{badge.name}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Next Tier Unlocks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rewardsData.nextTierUnlocks.map(unlock => (
              <Card key={unlock.id} className="bg-amber-50 border-amber-200">
                <CardHeader>
                  <CardTitle className="text-lg text-amber-900">{unlock.title}</CardTitle>
                  <p className="text-sm text-amber-800 pt-1">{unlock.description}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
