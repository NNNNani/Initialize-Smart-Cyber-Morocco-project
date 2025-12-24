
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import { Video } from '@google/genai';

export enum AppState {
  MAP,
  CITY_DETAIL,
  LOADING,
  ERROR,
}

export interface City {
  id: string;
  name: string;
  description: string;
  coordinates: { x: number; y: number };
  systems: string[];
  health: number;
}

export interface CyberScenario {
  id: string;
  title: string;
  type: 'attack' | 'defense';
  description: string;
}

export const CITIES: City[] = [
  {
    id: 'casablanca',
    name: 'Casablanca',
    description: 'The economic heart and financial hub of Morocco.',
    coordinates: { x: 35, y: 35 },
    systems: ['Banking & Finance', 'Port Logistics', 'Smart Grid'],
    health: 95
  },
  {
    id: 'rabat',
    name: 'Rabat',
    description: 'The administrative capital and center for digital governance.',
    coordinates: { x: 42, y: 28 },
    systems: ['E-Government', 'Education Network', 'National Archive'],
    health: 98
  },
  {
    id: 'tanger',
    name: 'Tanger',
    description: 'The gateway to the world and a major industrial smart port.',
    coordinates: { x: 48, y: 10 },
    systems: ['Tanger Med Port', 'Automotive Hub', 'Logistics'],
    health: 92
  },
  {
    id: 'oujda',
    name: 'Oujda',
    description: 'A growing tech hub and center for renewable energy.',
    coordinates: { x: 85, y: 15 },
    systems: ['Solar Farm', 'Tech University', 'Retail Systems'],
    health: 89
  }
];

export interface MentorMessage {
  role: 'mentor' | 'user';
  text: string;
  timestamp: number;
}

// Aspect ratio options for video generation
export enum AspectRatio {
  LANDSCAPE = '16:9',
  PORTRAIT = '9:16',
}

// Supported video resolutions
export enum Resolution {
  P720 = '720p',
  P1080 = '1080p',
}

// Full model names for Veo video generation
export enum VeoModel {
  VEO = 'veo-3.1-generate-preview',
  VEO_FAST = 'veo-3.1-fast-generate-preview',
}

// Video generation modes supported by the UI
export enum GenerationMode {
  TEXT_TO_VIDEO = 'Text to Video',
  FRAMES_TO_VIDEO = 'Frames to Video',
  REFERENCES_TO_VIDEO = 'References to Video',
  EXTEND_VIDEO = 'Extend Video',
}

// Container for file and its base64 representation for image uploads
export interface ImageFile {
  file: File;
  base64: string;
}

// Container for file and its base64 representation for video uploads
export interface VideoFile {
  file: File;
  base64: string;
}

// Configuration parameters passed to the video generation service
export interface GenerateVideoParams {
  prompt: string;
  model: VeoModel;
  aspectRatio: AspectRatio;
  resolution: Resolution;
  mode: GenerationMode;
  startFrame?: ImageFile | null;
  endFrame?: ImageFile | null;
  referenceImages?: ImageFile[];
  styleImage?: ImageFile | null;
  inputVideo?: VideoFile | null;
  inputVideoObject?: Video | null;
  isLooping?: boolean;
}
