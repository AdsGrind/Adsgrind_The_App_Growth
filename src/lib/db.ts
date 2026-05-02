import fs from 'fs/promises';
import path from 'path';

export interface Lead {
  id: string;
  name: string;
  email: string;
  company: string;
  message: string;
  status: 'New' | 'Contacted' | 'Qualified' | 'Closed';
  budget: string;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), 'data', 'leads.json');

async function ensureDirectory() {
  const dir = path.dirname(DB_PATH);
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function getLeads(): Promise<Lead[]> {
  await ensureDirectory();
  try {
    const data = await fs.readFile(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function saveLead(lead: Lead) {
  const leads = await getLeads();
  leads.push(lead);
  await fs.writeFile(DB_PATH, JSON.stringify(leads, null, 2));
}

export async function updateLeadStatus(id: string, status: Lead['status']) {
  const leads = await getLeads();
  const index = leads.findIndex(l => l.id === id);
  if (index !== -1) {
    leads[index].status = status;
    await fs.writeFile(DB_PATH, JSON.stringify(leads, null, 2));
    return leads[index];
  }
  return null;
}

export async function deleteLead(id: string) {
  const leads = await getLeads();
  const filteredLeads = leads.filter(l => l.id !== id);
  await fs.writeFile(DB_PATH, JSON.stringify(filteredLeads, null, 2));
}
