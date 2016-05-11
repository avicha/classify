#include <vector>
#include "Instance.h"
using namespace std;
#pragma once
class Instances {
	public:
		void deleteWithMissingClass(){
			vector<Instance>::iterator it;
			
		}
		Instance add(Instance ins){
			m_Instances.push_back(ins);
			return ins;
		}
	protected:
		vector<Instance> m_Instances;
};
