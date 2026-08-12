'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface LeaderboardEntry {
  user_id: string;
  username: string;
  total_xp: number;
  level: number;
  rank: number;
}

interface LeaderboardDisplayProps {
  currentUserId?: string;
}

/** Local-only leaderboard placeholder (no shared rankings without accounts). */
export function LeaderboardDisplay({ currentUserId }: LeaderboardDisplayProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const xp = Number(localStorage.getItem('focus_xp:guest') || 0);
      if (xp > 0) {
        const level = Math.floor(Math.sqrt(xp / 100)) + 1;
        setLeaderboard([
          {
            user_id: currentUserId || 'guest',
            username: 'Tú',
            total_xp: xp,
            level,
            rank: 1,
          },
        ]);
      } else {
        setLeaderboard([]);
      }
    } finally {
      setIsLoading(false);
    }
  }, [currentUserId]);

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-5 w-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="h-5 w-5 text-gray-400" />;
    if (rank === 3) return <Medal className="h-5 w-5 text-amber-600" />;
    return null;
  };

  const getRankBgColor = (rank: number) => {
    if (rank === 1) return 'bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-300';
    if (rank === 2) return 'bg-gradient-to-r from-gray-50 to-gray-100 border-gray-300';
    if (rank === 3) return 'bg-gradient-to-r from-amber-50 to-amber-100 border-amber-300';
    return 'bg-white border-gray-200';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Tu progreso
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {leaderboard.length === 0 ? (
          <p className="text-sm text-gray-600 text-center py-8">
            Completa ejercicios para ver tu XP aquí. Sin cuentas ni ranking global.
          </p>
        ) : (
          <div className="space-y-2">
            {leaderboard.map((entry, index) => {
              const icon = getRankIcon(entry.rank);
              return (
                <motion.div
                  key={entry.user_id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-3 p-3 rounded-lg border-2 ${getRankBgColor(entry.rank)}`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-300 font-bold text-gray-700">
                    {icon || `#${entry.rank}`}
                  </div>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-orange-600 text-white">
                      {entry.username.substring(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate text-gray-900">{entry.username}</p>
                    <p className="text-sm text-gray-600">Level {entry.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{entry.total_xp.toLocaleString()}</p>
                    <p className="text-xs text-gray-600">XP</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 pt-4 border-t">
          <div className="p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Users className="h-4 w-4 text-blue-600" />
              <p className="text-xs text-blue-600 font-medium">Sesión local</p>
            </div>
            <p className="text-2xl font-bold text-blue-900">{leaderboard.length}</p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="h-4 w-4 text-orange-600" />
              <p className="text-xs text-orange-600 font-medium">Nivel</p>
            </div>
            <p className="text-2xl font-bold text-orange-900">
              {leaderboard[0]?.level || 1}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
