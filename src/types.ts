/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Story {
  id: string;
  name: string;
  city: string;
  role: string; // e.g., "Parent", "Teacher", "Retired Farmer"
  storyText: string;
  isCustom?: boolean;
  date: string;
}

export interface Signer {
  id: string;
  name: string;
  city: string;
  date: string;
}

export interface DemandItem {
  id: number;
  title: string;
  description: string;
  iconName: string;
  impact: string;
}
