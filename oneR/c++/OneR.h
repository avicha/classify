#include<cstdio>
#include "Instances.h"
class OneR {
	public:
		OneR() {
			std::cout<<"hello world"<<std::endl;
		}
		void buildClassifier(Instances instances) {
			instances.deleteWithMissingClass();
		}
		double classifyInstance(Instance inst) {
			return 0;
		}
	private:
};

